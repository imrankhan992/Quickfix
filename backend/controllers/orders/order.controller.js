const AcceptOrder = require("../../Models/Order/AcceptOrder");
const Order = require("../../Models/Order/Order");
const OrderModel = require("../../Models/Order/Order");
const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const Transaction = require("../../Models/Transaction/transaction.model");
const sendEmail = require("../../utils/sendEmail");

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
      currentService,
      category,
      orderExpiresAt,
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
      category,
      CityName,
      orderExpireAt: orderExpiresAt,
    });
    // console.log(req.body);
    const savedOrder = await newOrder.save();

    if (savedOrder) {
      const serviceProviders = await registrationModel.find({
        job: currentService,
        city: CityName,
      });

      await savedOrder.populate("serviceId"); // Populate serviceId field
      const { io, getallSocketIds } = require("../../app");
      const allSocketIds = getallSocketIds();

      const adminCut = price * 0.2; // Calculate the admin's cut
      serviceProviders.forEach(async (serviceProvider) => {
        const socketId = allSocketIds[serviceProvider._id];
        const provider = await registrationModel.findById(serviceProvider._id);

        if (provider.walletBalance >= adminCut) {
          if (socketId !== undefined) {
            io?.to(socketId)?.emit("order", newOrder);
          }
        }
      });
    }

    res.status(201).json({
      message: "Order created successfully",
      success: true,
      newOrder,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
      sucess: false,
    });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const { _id, job } = req?.user;
    const { CityName } = req.body;
    const orders = await OrderModel.find({ category: job, CityName })
      .populate("serviceId")
      .populate("clientId");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.sendOffer = async (req, res) => {
  try {
    const { io, getallSocketIds } = require("../../app");
    const allSocketIds = getallSocketIds();
    const { price, orderId, distance, time, currentDate } = req.body;

    const { _id } = req.user;
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }

    let newOffer = {
      serviceProvider: _id,
      price,
      distance,
      time,
      orderId: orderId,
    };
    // check if the order is expired
    if (order.orderExpireAt < new Date()) {
      return res.status(400).json({ success: false, message: "Order expired" });
    }
    // check if the offer is already sent
    const checkOffer = order.totalOffers.find(
      (offer) => offer.serviceProvider.toString() === _id.toString()
    );
    if (checkOffer) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Offer already sent please wait for the response...",
        });
    }
    // check if the order is already accepted by the client in the array
    const checkAccepted = order.totalOffers.find(
      (offer) => offer.status === "accepted"
    );
    if (checkAccepted) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Sorry! This project is taken by other service provider ",
        });
    }

    order.totalOffers.push(newOffer);
    const check = await order.save();
    if (!check) {
      return res
        .status(400)
        .json({ success: false, message: "Offer not sent" });
    }

    const socketId = allSocketIds[order.clientId];
    newOffer = {
      ...newOffer,
      serviceProvider: {
        _id: req.user._id,
        firstname: req?.user?.firstname,
        lastname: req?.user?.lastname,
        avatar: req?.user?.avatar?.url,
      },
    };

    if (socketId !== undefined) {
      io?.to(socketId)?.emit("sendOffer", newOffer);
    }
    res
      .status(200)
      .json({ success: true, message: "Offer sent successfully", order });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get all orders which client has placed
exports.getAllOrdersWhichClientPost = async (req, res) => {
  try {
    const { _id } = req.user;
    // populate the totalOffer array with serviceProvider details

    const orders = await OrderModel.find({ clientId: _id })
      .populate("serviceId")
      .populate("totalOffers.serviceProvider");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.acceptOffer = async (req, res) => {
  try {
    const { io, getallSocketIds } = require("../../app");
    const allSocketIds = getallSocketIds();
    const { orderId, serviceProviderId } = req.body;
    const { _id } = req.user;

    // Find the order and populate necessary fields
    const order = await Order.findById(orderId)
      .populate("serviceId")
      .populate("totalOffers.serviceProvider");

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }

    // Check if the order already accepted by the client
    const checkAccepted = order.totalOffers.find(
      (offer) => offer.status === "accepted"
    );
    if (checkAccepted) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Service provider already hired for this project.",
        });
    }

    // Update the status of the offer to accepted and reject others
    order.totalOffers.forEach((offer) => {
      offer.status =
        offer.serviceProvider?._id.toString() === serviceProviderId.toString()
          ? "accepted"
          : "rejected";
    });

    // Update the offer price which is given by the service provider
    const newPrice = order.totalOffers.find(
      (offer) =>
        offer.serviceProvider?._id.toString() === serviceProviderId.toString()
    ).price;

    // Save the order with updated offers
    const updatedOrder = await order.save();
    if (!updatedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Offer not accepted" });
    }

    // Save acceptance details to the AcceptOrder collection
    const newAcceptOrder = new AcceptOrder({
      order: orderId,
      serviceProvider: serviceProviderId,
      clientId: _id,
      isAccepted: true,
      price: newPrice,
    });

    // Deduct 20% of the price from the service provider walletBalance
    const serviceProviderWallet = await registrationModel.findById(
      serviceProviderId
    );

    // Check if sufficient balance is available in the wallet
    if (
      serviceProviderWallet.walletBalance <= 0 ||
      serviceProviderWallet.walletBalance < newPrice * 0.2
    ) {
      throw new Error(
        "OOPS!  Insufficient balance in the service provider wallet. Please hire another service Provider."
      );
    }
    const deductionAmount = newPrice * 0.2;
    serviceProviderWallet.walletBalance -= deductionAmount;
    await serviceProviderWallet.save();

    await newAcceptOrder.save();

    // Create a transaction record
    const newTransaction = new Transaction({
      userId: serviceProviderId,
      type: "deduction",
      amount: deductionAmount,
      description: `Deduction for order ${orderId}`,
    });

    await newTransaction.save();

    // Send notification to the service provider if available
    const socketId = allSocketIds[serviceProviderId];
    if (socketId) {
      io?.to(socketId)?.emit("offerAccepted", updatedOrder);
    }

    // Send email notification to the service provider
    const serviceProvider = await registrationModel.findById(serviceProviderId);
    await sendEmail({
      email: serviceProvider?.email,
      subject: "Congratulations! Offer Accepted",
      html: `
        <body style="font-family:Arial,sans-serif;background-color:#f7f8fa;margin:0;padding:0">
          <div style="max-width:700px;margin:30px auto;padding:20px;background:#fff;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1)">
            <div style="text-align:center;border-bottom:2px solid #eee;padding-bottom:20px">
              <h1 style="color:#333;font-size:2em;margin:0">Order Confirmation Receipt</h1>
              <h2 style="color:#666;font-size:1.2em;margin:5px 0 0 0">Congratulations! Your Offer Has Been Accepted</h2>
            </div>
            <div style="padding:20px 0">
              <p style="font-size:1em;color:#333;line-height:1.6">Dear ${serviceProvider?.firstname},</p>
              <p style="font-size:1em;color:#333;line-height:1.6">
                We are delighted to inform you that your offer has been accepted. Thank you for choosing our services.
                Below are the details of your order and appointment:
              </p>
              <div style="margin-bottom:20px">
                <h2 style="font-size:1.3em;color:#333;border-bottom:2px solid #4caf50;padding-bottom:5px;margin-bottom:10px">Order Details:</h2>
                <table style="width:100%;border-collapse:collapse">
                  <tr>
                    <th style="padding:10px;border:1px solid #ddd;background-color:#f4f4f4;text-align:left">Order Number</th>
                    <td style="padding:10px;border:1px solid #ddd">${updatedOrder._id}</td>
                  </tr>
                  <tr>
                    <th style="padding:10px;border:1px solid #ddd;background-color:#f4f4f4;text-align:left">Service Name</th>
                    <td style="padding:10px;border:1px solid #ddd">${updatedOrder?.serviceId?.title}</td>
                  </tr>
                  <tr>
                    <th style="padding:10px;border:1px solid #ddd;background-color:#f4f4f4;text-align:left">Quantity</th>
                    <td style="padding:10px;border:1px solid #ddd">${updatedOrder?.quantity}</td>
                  </tr>
                  <tr>
                    <th style="padding:10px;border:1px solid #ddd;background-color:#f4f4f4;text-align:left">Price</th>
                    <td style="padding:10px;border:1px solid #ddd">${updatedOrder?.price}</td>
                  </tr>
                </table>
              </div>
              <div style="margin-bottom:20px">
                <h2 style="font-size:1.3em;color:#333;border-bottom:2px solid #4caf50;padding-bottom:5px;margin-bottom:10px">Appointment Details:</h2>
                <table style="width:100%;border-collapse:collapse">
                  <tr>
                    <th style="padding:10px;border:1px solid #ddd;background-color:#f4f4f4;text-align:left">Date</th>
                    <td style="padding:10px;border:1px solid #ddd">${updatedOrder?.dateandtime}</td>
                  </tr>
                  <tr>
                    <th style="padding:10px;border:1px solid #ddd;background-color:#f4f4f4;text-align:left">Time</th>
                    <td style="padding:10px;border:1px solid #ddd">${updatedOrder?.dateandtime}</td>
                  </tr>
                  <tr>
                    <th style="padding:10px;border:1px solid #ddd;background-color:#f4f4f4;text-align:left">Location</th>
                    <td style="padding:10px;border:1px solid #ddd">${updatedOrder?.address}</td>
                  </tr>
                </table>
              </div>
              <div style="margin-bottom:20px">
                <h2 style="font-size:1.3em;color:#333;border-bottom:2px solid #4caf50;padding-bottom:5px;margin-bottom:10px">Next Steps:</h2>
                <p style="margin:8px 0;font-size:1em;color:#555">1. <strong>Confirmation:</strong> Please confirm your appointment by replying to this email or calling us at [Phone Number].</p>
                <p style="margin:8px 0;font-size:1em;color:#555">2. <strong>Preparation:</strong> Prepare any necessary documents or information needed for the appointment.</p>
                <p style="margin:8px 0;font-size:1em;color:#555">3. <strong>Contact Us:</strong> If you have any questions or need to reschedule, feel free to contact our support team.</p>
              </div>
            </div>
            <div style="text-align:center;padding-top:20px;color:#777">
              <p style="margin:5px 0">Thank you! We look forward to serving you and ensuring a great experience.</p>
              <p style="margin:5px 0">Best regards,</p>
              <p style="margin:5px 0">[Your Company Name]</p>
              <p style="margin:5px 0">[Your Contact Information]</p>
            </div>
          </div>
        </body>
      `,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Offer accepted successfully",
        order: updatedOrder,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAcceptedOffersClient = async (req, res) => {
  try {
    const { _id } = req.user;
    const orders = await AcceptOrder.find({ clientId: _id })
      .populate("serviceProvider")
      .populate({
        path: "order",
        populate: {
          path: "serviceId",
        },
      });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// get single accepted offer by client using id
exports.getSingleAcceptedOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await AcceptOrder.findById(id)
      .populate("serviceProvider")
      .populate({
        path: "order",
        populate: [{ path: "clientId" }, { path: "serviceId" }],
      });
    if (!order) {
      throw new Error("Order not found");
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    // console.log(error);
    // object cast error
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// get accepted order by service provider
exports.getAcceptedOffersServiceProvider = async (req, res) => {
  try {
    const { _id } = req.user;
    const orders = await AcceptOrder.find({ serviceProvider: _id })
      .populate("clientId")
      .populate({
        path: "order",
        populate: {
          path: "serviceId",
        },
      });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get single offer by service provider using id
exports.getSingleServiceProviderOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await AcceptOrder.findById(id).populate({
      path: "order",
      populate: [{ path: "clientId" }, { path: "serviceId" }],
    });
    if (!order) {
      throw new Error("Order not found");
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    // console.log(error);
    // object cast error
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete order by client
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new Error("Order not found");
    }
    res
      .status(200)
      .json({ success: true, message: "Order cancel successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update order  status by client
exports.updateOrderStatusByClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientSideOrderStatus } = req.body;
    const order = await AcceptOrder.findByIdAndUpdate(
      id,
      { clientSideOrderStatus },
      { new: true }
    );
    if (!order) {
      throw new Error("Order not found");
    }
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update order by service provider

exports.updateOrderStatusByProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceProviderOrderStatus } = req.body;
    const order = await AcceptOrder.findByIdAndUpdate(
      id,
      { serviceProviderOrderStatus },
      { new: true }
    );
    if (!order) {
      throw new Error("Order not found");
    }
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all the orders which is accepted by the client
exports.getAllAcceptedOrdersByClient = async (req, res) => {
  try {
    const { _id } = req.user;
    const orders = await AcceptOrder.find({ clientId: _id })
      .populate("serviceProvider")
      .populate("clientId")
      .populate({
        path: "order",
        populate: [{ path: "serviceId" }],
      });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all the orders which is accepted by the service provider
exports.getAllAcceptedOrdersByProvider = async (req, res) => {
  try {
    const { _id } = req.user;
    const orders = await AcceptOrder.find({ serviceProvider: _id })
      .populate("serviceProvider")
      .populate("clientId")
      .populate({
        path: "order",
        populate: [{ path: "serviceId" }],
      });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// get all active orders of serviceProvider

exports.getallActiveOrders = async (req, res) => {
  try {
    const id = req.user._id;
    const orders = await AcceptOrder.find({
      serviceProvider: id,
      $or: [
        { serviceProviderOrderStatus: { $ne: "completed" } },
        { clientSideOrderStatus: { $ne: "completed" } }
      ]
    });
    
    const totalOrdersLength = orders.length;
    res.status(200).json({ orders, totalOrdersLength, success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// get all active orders of serviceProvider

exports.getallActiveOrdersClient = async (req, res) => {
  try {
    const id = req.user._id;
    const orders = await AcceptOrder.find({
      clientId: id,
      $or: [
        { serviceProviderOrderStatus: { $ne: "completed" } },
        { clientSideOrderStatus: { $ne: "completed" } }
      ]
    });
    const AllActiveOrders = await AcceptOrder.find({clientId:id});
    const totalOrdersLengthBySpecificClient = AllActiveOrders.length;
    
    const totalOrdersLength = orders.length;
    res.status(200).json({ orders, totalOrdersLength, totalOrdersLengthBySpecificClient,success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


