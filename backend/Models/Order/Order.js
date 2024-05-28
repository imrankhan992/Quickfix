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
    category: {
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
    },
    CityName: {
        type: String,
        required: true,
    },
    orderExpireAt: {
        type: Date,
        required: true,
       
    },
    totalOffers: [
        {
            serviceProvider: {
                type: mongoose.Schema.ObjectId,
                ref: "ServiceProviderRegistration",
                required: true
            },
            price: {
                type: Number,
                required: true,
            },
            distance: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            status: {
                type: String,
                enum: ["pending", "completed", "rejected", "accepted"],
                default: "pending"
            },

        }

    ]
}, { timestamps: true });


module.exports = mongoose.model("Order", orderSchema);
