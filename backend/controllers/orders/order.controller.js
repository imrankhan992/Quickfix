const OrderModel = require("../../Models/Order/Order");
const registrationModel = require("../../Models/ServiceProvider/registrationModel");

exports.postNewOrder = async (req, res) => {
    try {
        const { price, dateandtime, address, quantity, clientId, serviceId, CityName, currentService
        } = req.body;

        if (!price || !dateandtime || !address || !quantity || !clientId || !serviceId || !CityName) {
            return res.status(400).json({
                message: "Please fill all the required fields",
                success: false,
            });
        }
        const serviceProviders = await registrationModel.find({ job: currentService, city: CityName });

        const newOrder = new OrderModel({
            price,
            dateandtime,
            address,
            quantity,
            clientId,
            serviceId,
            CityName,
        });
        const savedOrder = await newOrder.save();
        if (savedOrder) {

            const { io, getSocketId } = require("../../app");
            
            serviceProviders.forEach(serviceProvider => {
                const socketId = getSocketId(serviceProvider?._id); // Assuming _id is the socket ID field
                // console.log(socketId);
                if (socketId) {
                    io?.to(socketId)?.emit('order', newOrder);
                }
            });

        }


        res.status(201).json({
            message: "Order created successfully",
            success: true,
            newOrder
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false,
        });
    }
};
