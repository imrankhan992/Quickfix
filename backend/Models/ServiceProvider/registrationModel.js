const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    activeStatus: {
        type: String,
        default: "Offline",
    },
    lastActive: {
        type: Date,
    },
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
    experience: {
        type: String,
    },
    city: {
        type: String,
    },
    job: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
    zipcode: {
        type: String,
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
        enum: ["user", "admin", "serviceprovider"],
        default: "serviceprovider",
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
    currentlocation: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    stripeCustomerId: {
        type: String,
        required: true
    },
    walletBalance: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            name: {
                type: String,
                required: true
            },
            order: {
                type: mongoose.Schema.ObjectId,
                ref: "Order",
            },
            rating: {
                type: Number,
                required: true,
            },
            feedback: {
                type: String,
                required: true,
            },
        },
    ],
    verifyEmailToken: String,
    verifyEmailExpires: Date,
});
userSchema.index({ currentlocation: "2dsphere" });
//creating password reset token
userSchema.methods.getverifyEmailToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.verifyEmailToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.verifyEmailExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
};
// password encrypt before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY_JWT, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

module.exports = mongoose.model("ServiceProviderRegistration", userSchema);
