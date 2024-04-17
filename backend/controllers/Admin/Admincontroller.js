const CategoryModel = require("../../Models/Admin/CategoryModel");
const ProductModel = require("../../Models/Product/ProductModel");
const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const UserModel = require("../../Models/User/UserModel");
const sendEmail = require("../../utils/sendEmail");
const cloudinary = require("cloudinary");
exports.countingController = async (req, res) => {
    try {
        const spUsersCount = await registrationModel.countDocuments();
        const usersCount = await UserModel.countDocuments();
        res.status(200).json({
            success: true,
            spUsersCount,
            usersCount,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// load data

exports.loadAdminData = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req?.user?._id });
        const serviceprovider = await registrationModel.findOne({ _id: req?.user?._id });
        if (!user && !serviceprovider) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        if (user) {
            return res.status(200).json({
                user,
                message: "User  found",
                success: false,
            });
        }
        if (serviceprovider) {
            return res.status(200).json({
                user,
                message: "User  found",
                success: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// update account status

exports.updateAccountController = async (req, res) => {
    try {
        const { id } = req.params;
        const { accountStatus } = req.body;
        const user = await registrationModel.findOne({ _id: id });
        if (!user) {
            res.status(200).json({
                success: false,
                message: "user not found",
            });
        }
        user.accountStatus = accountStatus;
        await user.save();

        let message =
            user.accountStatus === "approve"
                ? `Congratulations your Account has been ${user.accountStatus} `
                : `your Account has been ${user.accountStatus}`;
        await sendEmail({
            subject: "Account Status",
            email: user?.email,
            message,
            name: user?.firstname,
        });
        res.status(200).json({
            success: true,
            user,
        });
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
};

exports.getsingleServiceProviderController = async (req, res) => {
    try {
        const user = await registrationModel.findOne({ _id: req.params.id });
        if (!user) {
            res.status(200).json({
                success: false,
                message: "user not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
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
};

// createCategoryController
exports.createCategoryController = async (req, res) => {
    try {
        const { service } = req.body;
        const category = await CategoryModel.findOne({ category: service });
        if (category) {
            return res.status(200).json({
                success: false,
                message: "This service is already exist",
            });
        }

        const createCategory = new CategoryModel({
            category: service,
        });

        await createCategory.save();
        return res.status(200).json({
            success: true,
            message: "new service created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
};

// get all category

exports.getallcategoryiesController = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        return res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
};

// delete category
exports.deleteCategoryController = async (req, res) => {
    try {
        const updateCategory = await CategoryModel.findByIdAndDelete({
            _id: req.params.id,
        });
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
};

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
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
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
};

exports.createProductController = async (req, res) => {
    try {
        const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
        const { title, category, description, price } = req.body;
        console.log(req.body);
        const product = new ProductModel({
            title,
            category,
            description,
            price,
            picture: {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id,
            },
        });
        const saveproduct = await product.save();
        res.status(200).json({
            success: true,
            message: "product create successfully",
            product: saveproduct,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
};

// get all products

exports.getallProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate("category");
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
};

// delete product

exports.deleteProductController = async (req, res) => {
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete({
            _id: req?.params?.id,
        });
        if (!deleteProduct) {
            return res.status(404).json({
                success: false,
                message: `Product with this id not found`,
            });
        }
        if (deleteProduct) {
            return res.status(200).json({
                success: true,
                message: `Product deleted successfully`,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
};

// updateProductController
exports.updateProductController = async (req, res) => {
    try {
        const { title, category, description, price } = req.body;
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found with this id",
            });
        }

        if (req.file) {
            await cloudinary.uploader.destroy(product.picture.public_id);

            const cloudinaryResult = await cloudinary.uploader.upload(c);

            product.picture = {
                public_id: cloudinaryResult.public_id,
                url: cloudinaryResult.secure_url,
            };
        }

        // Update product details
        product.title = title;
        product.category = category;
        product.description = description;
        product.price = price;

        // Save the updated product
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
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
};

exports.singleProductController = async (req, res) => {
    try {
        const product = await ProductModel.findById({ _id: req.params.id }).populate("category")
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found with this id",
            });
        }
        return res.status(200).json({
            success: true,
            product
        })
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

// logout

exports.logout = async (req, res) => {
    try {

        await registrationModel.findByIdAndUpdate(req?.params?.id, {
            activeStatus: "Offline",
            lastActive: new Date(Date.now())
        });


        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        return res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
};


// getallproductsByCategory

exports.getallproductsByCategory = async (req, res) => {
    try {

        const products = await ProductModel.find({ category: req.params.services });
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No Services avaliable" })
        }
        return res.status(200).json({
            success: true,
            products
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
            error: error,
        });
    }
}

// get single product using id

exports.getsingleServiceById = async (req, res) => {
    try {
        const SingleService = await ProductModel.findById({ _id: req?.params?.id }).populate("category")
        if (!SingleService) {
            return res.status(404).json({
                success: false,
                message: "Invalid id"
            })
        }

        res.status(200).json({
            success: true,
            service: SingleService
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(500).json({
                success: false,
                message: "Invalid id",
            });
        }
    }
}

// find service provider 

exports.findserviceProviders = async (req, res) => {


    try {
        const { city, currentLocation, job } = req.body;
        const { lng, lat } = currentLocation;
        // Query service providers based on city and location
        const serviceProviders = await registrationModel.find({
            city,
            accountStatus: "approve",
            job
        });
        if (serviceProviders?.length === 0) {
            return res.json({ success: false, serviceProviders });
        }

        res.json({ success: true, serviceProviders });
    } catch (error) {
        console.error('Error finding service providers:', error);
        res.status(500).json({ error });
    }
}

exports.updatetheAccountStatus = async (req, res) => {
    try {
        const { activeStatus, lastActive } = req.body;
        if (activeStatus && lastActive) {
            await registrationModel.findByIdAndUpdate(req?.user?._id, {
                activeStatus,
                lastActive
            });
        }
        await registrationModel.findByIdAndUpdate(req?.user?._id, {
            activeStatus,
        });
        res.status(200).json({ success: true, message: 'Service provider status updated successfully.' });
    } catch (error) {
        // Handle errors
        console.error('Error updating service provider status:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
}