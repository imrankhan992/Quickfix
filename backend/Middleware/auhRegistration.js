const registrationModel = require("../Models/ServiceProvider/registrationModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
    
        if (!token) {
            return res.status(401).json({
                message: "Please log in to access this resource",
                success: false,
            });
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
        const user = await registrationModel.findById(verifyToken.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found. Please log in again.",
                success: false,
            });
        }

        req.user = user; 
        next();

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token. Please log in again.",
                success: false,
            });
        }

        console.error("Authentication error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
