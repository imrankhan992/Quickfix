const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const UserModel = require("../../Models/User/UserModel");
const sendEmail = require("../../utils/sendEmail");

exports.countingController = async (req, res) => {

    try {
        const spUsersCount = await registrationModel.countDocuments();
        const usersCount = await UserModel.countDocuments();
        res.status(200).json({
            success: true,
            spUsersCount,
            usersCount
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// load data

exports.loadAdminData = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req?.user?._id });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        res.status(200).json({
            user,
            message: "User  found",
            success: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// update account status

exports.updateAccountController = async (req, res) => {
    try {
        const { id } = req.params;
        const { accountStatus } = req.body
        const user = await registrationModel.findOne({ _id: id });
        if (!user) {
            res.status(200).json({
                success: false,
                message: "user not found"
            })
        }
        user.accountStatus = accountStatus;
        await user.save()

        let message = user.accountStatus === "approve" ? `Congratulations your Account has been ${user.accountStatus} ` : `your Account has been ${user.accountStatus}`;
        await sendEmail({
            subject: "Account Status",
            email: user?.email,
            message,
            name: user?.firstname

        });
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(500).json({
                success: false,
                message: "Invalid id",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

exports.getsingleServiceProviderController = async (req, res) => {
    try {
        const user = await registrationModel.findOne({ _id: req.params.id })
        if (!user) {
            res.status(200).json({
                success: false,
                message: "user not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(500).json({
                success: false,
                message: "Invalid id",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}