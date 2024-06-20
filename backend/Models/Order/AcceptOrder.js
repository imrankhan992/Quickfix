const mongoose = require("mongoose")
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
    }

}, { timestamps: true });


module.exports = mongoose.model("AcceptedOrders", acceptOrderSchema);
