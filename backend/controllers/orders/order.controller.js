const OrderModel = require("../../Models/Order/Order");
const { io } = require("../../app");
exports.postNewOrder = async (req, res) => {
    try {
        const {
            price,
            dateandtime,
            address,
            quantity,
            clientId,
            serviceId,
            CityName,
        } = req.body;
        if (
            !price ||
            !dateandtime ||
            !address ||
            !quantity ||
            !clientId ||
            !serviceId ||
            !CityName
        ) {
            return res.status(400).json({
                message: "Please fill all the required fields",
                success: false,
            });
        }

        const newOrder = new OrderModel({
            price,
            dateandtime,
            address,
            quantity,
            clientId,
            serviceId,
            CityName,
        });
      const savedOrder=  await newOrder.save();
      if(savedOrder){
            io?.emit('order', newOrder);
      }
        res.status(201).json({
            message: "Order created successfully",
            success: true,
            newOrder
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false,
        });
    }
};
