const registrationModel = require("../Models/ServiceProvider/registrationModel");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User/UserModel");

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

// check role

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req?.user?.role)) {
            return res.status(401).json({
                message: `Role: ${req?.user?.role} is not allowed to access this resource`,
                success: false,
            });
        }
        next();
        
    }
}

// user auth
exports.isIserAuthenticated = async (req, res, next) => {
    try {
        const { usertoken } = req.cookies;
    
        if (!usertoken) {
            return res.status(401).json({
                message: "Please log in to access this resource",
                success: false,
            });
        }

        const verifyToken = jwt.verify(usertoken, process.env.SECRET_KEY_JWT);
        const user = await UserModel.findById(verifyToken.id).select("-password");

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