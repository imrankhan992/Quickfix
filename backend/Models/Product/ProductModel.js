const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    picture: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    }

});


module.exports = mongoose.model("Product", productSchema);
