const mongoose = require("mongoose")
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerify: {
        type: Boolean,
        default: false,
    },
    accountStatus: {
        type: String,
        enum: ["approve", "reject", "deactivate", "pending", "disabled"],
        default: "pending",
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    bio: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    verifyEmailToken:String,
    verifyEmailExpires:Date
});
//creating password reset token
userSchema.methods.getverifyEmailToken = async function () {
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //hash reset token and add to user schema
    this.verifyEmailToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.verifyEmailExpires = Date.now() + 15 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model("ServiceProviderRegistration", userSchema);
