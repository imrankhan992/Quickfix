const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    clientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    serviceId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateandtime: {
        type: Date,
        required: true,
    }
});


module.exports = mongoose.model("Order", orderSchema);
