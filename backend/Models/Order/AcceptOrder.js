const mongoose = require("mongoose");

const acceptOrderSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true
    },
    serviceProvider: {
        type: mongoose.Schema.ObjectId,
        ref: "ServiceProviderRegistration",
        required: true
    },
    clientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    clientSideOrderStatus: {
        type: String,
        enum: [ "pending","completed", "Cancel"],
        default: "pending"
    },
    serviceProviderOrderStatus: {
        type: String,
        enum: ["pending", "processing", "completed", "Cancel"],
        default: "pending"
    },
    finalOrderStatus:{
        type: String,
        enum: ["Incomplete", "Completed"],
        default: "Incomplete"
    }
}, { timestamps: true });

module.exports = mongoose.model("AcceptedOrders", acceptOrderSchema);
