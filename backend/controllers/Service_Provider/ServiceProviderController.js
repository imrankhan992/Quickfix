const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const { sendToken } = require("../../utils/sendToken");
const cloudinary = require("../../Middleware/cloudinary");
const UserModel = require("../../Models/User/UserModel");
const { userToken } = require("../../utils/userToken");
exports.registerUserController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userexist = await registrationModel.findOne({
            email: req.body.email,
        });
        if (userexist && userexist?.emailVerify) {
            return res.status(400).json({
                success: false,
                message: "Email already used",
            });
        }
        const serviceconsumer = await UserModel.findOne({ email })
        if (serviceconsumer && serviceconsumer?.emailVerify) {
            return res.status(400).json({
                success: false,
                message: "Email already used",
            });
        }
        if (!userexist) {
            const newuser = new registrationModel({
                firstname,
                lastname,
                email,
                password,
            });

            const verifyToken = await newuser.getverifyEmailToken();
            await newuser.save({ validateBeforeSave: false });
            const verifyEmailUrl = `${process.env.FRONTENT_URL}/api/v1/email/account/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            await sendEmail({
                email: newuser?.email,
                message,
            });
            res.status(200).json({ success: true, user: newuser })
            // sendToken(newuser, 200, res);
        }

        if (userexist && !userexist?.emailVerify) {
            const { firstname, lastname, email, password } = req.body;
            userexist.firstname = firstname;
            userexist.lastname = lastname;
            userexist.email = email;
            userexist.password = password;
            const verifyToken = await userexist.getverifyEmailToken();
            await userexist.save({ validateBeforeSave: false });
            const verifyEmailUrl = `${process.env.FRONTENT_URL}/api/v1/email/account/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            await sendEmail({
                email: userexist?.email,
                message,
            });

            res.status(200).json({ success: true, user: userexist })
            // sendToken(userexist, 200, res);
        }
    } catch (error) {

        newuser.verifyEmailToken = undefined;
        newuser.verifyEmailExpires = undefined;
        await newuser.save({ validateBeforeSave: false });
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false,
        });
    }
};

exports.verifyEmailController = async (req, res) => {
    try {
        const verifyEmailToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");
        const user = await registrationModel.findOne({
            verifyEmailToken,
            verifyEmailExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Verify Email Token is invalid or has been expired",
                success: false,
            });
        }

        user.verifyEmailToken = undefined;
        user.verifyEmailExpires = undefined;
        user.emailVerify = true;
        await user.save();
        // res.status(200).json({ success: true });
        sendToken(user, 200, res)
    } catch (error) {

        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false,
        });
    }
};

// setupprofle
exports.setupProfileController = async (req, res) => {
    try {
        const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

        const {
            phoneNumber,
            address,
            dateOfBirth,
            experience,
            city,
            job,
            zipcode,
        } = req.body;
        const user = await registrationModel.findOne({ _id: req?.user?._id });
        user.phoneNumber = phoneNumber;
        user.address = address;
        user.dateOfBirth = dateOfBirth;
        user.experience = experience;
        user.city = city;
        user.job = job;
        user.zipcode = zipcode;
        user.avatar = {
            url: cloudinaryResult.secure_url,
            public_id: cloudinaryResult.public_id,
        };
        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Your Profile submitted successfully",
        });
    } catch (error) {

        res.status(500).json({
            message: "Internal server error",

            sucess: false,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
// route protected setupprofileRouteController
exports.setupprofileRouteController = async (req, res) => {
    try {
        const user = await registrationModel.findOne({ _id: req?.user?._id });
        if (!user) {
            return res.status(404).json({ ok: false, message: "user not found" })
        }
        // const newuser = await registrationModel.findOne({city:user.city,phoneNumber:user.phoneNumber})

        if (user.city !== undefined || user.job !== undefined || user.phoneNumber !== undefined) {
            return res.status(200).json({ ok: false, message: "data already entered" })
        }
        res.status(200).json({ ok: true, message: "data not entered" })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// login user data 
exports.loaddata = async (req, res) => {
    try {
        const user = await registrationModel.findOne({ _id: req?.user?._id });
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


// login user

exports.loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist1 = await registrationModel.findOne({ email });
        const userExist2 = await UserModel.findOne({ email });

        if (userExist1 && await userExist1.comparePassword(password) && userExist1.emailVerify) {

            sendToken(userExist1, 200, res)


        } else if (userExist2 && await userExist2.comparePassword(password) && userExist2.emailVerify) {

            userToken(userExist2, 200, res)

        } else {
            return res.status(409).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// submitProfileornot
exports.submitProfileornot = async (req, res) => {
    try {
        const user = await registrationModel.findOne({ _id: req?.user?._id });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found",
            });
        }
        if (user.job === undefined || user.experience === undefined) {
            return res.status(200).send({
                success: false,
                message: "user have not submitted profile",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user have  submitted profile",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// get all sp provider

exports.getallServiceprovider = async (req, res) => {
    try {
        const sp_provider = await registrationModel.find({emailVerify:true});
        res.status(200).json({
            success: true,
            user: sp_provider
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

