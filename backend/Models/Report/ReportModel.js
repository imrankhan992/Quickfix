const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    serviceProvider: {
        type: mongoose.Schema.ObjectId,
        ref: "ServiceProviderRegistration",
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    reason: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false,
    },
    reportCount: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });


module.exports = mongoose.model("Report", ReportSchema);
