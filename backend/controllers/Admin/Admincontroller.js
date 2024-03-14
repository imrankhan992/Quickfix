const CategoryModel = require("../../Models/Admin/CategoryModel");
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

// createCategoryController
exports.createCategoryController = async (req, res) => {
    try {
        const { service } = req.body;
        const category = await CategoryModel.findOne({ category: service });
        if (category) {
            return res.status(200).json({
                success: false,
                message: "This service is already exist"
            })
        }

        const createCategory = new CategoryModel({
            category: service
        });

        await createCategory.save();
        return res.status(200).json({
            success: true,
            message: "new service created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
}

// get all category

exports.getallcategoryiesController = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        return res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
}

// delete category
exports.deleteCategoryController = async (req, res) => {
    try {
        const updateCategory = await CategoryModel.findByIdAndDelete({ _id: req.params.id })
        if (!updateCategory) {
            return res.status(404).json({
                success: false,
                message: `Category with this id not found`,

            });
        }
        if (updateCategory) {
            return res.status(200).json({
                success: true,
                message: `Category deleted successfully`,

            });
        }
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
            error: error,
        });
    }
}

// updateCategoryController

exports.updateCategoryController = async (req, res) => {
    try {
        const { category } = req.body;

        // Check if a category with the same name already exists
        const existingCategory = await CategoryModel.findOne({ category });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: `Category '${category}' already exists`,
            });
        }

        // Proceed with updating the category if it doesn't already exist
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            req.params.id, // Category ID to update
            { category }, // New category data
            { new: true } // To return the updated category
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({
            success: true,
            message: `Category updated successfully`,
        });
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(500).json({
                success: false,
                message: "Invalid id",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
}
