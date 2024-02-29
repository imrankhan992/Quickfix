const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const { sendToken } = require("../../utils/sendToken");

exports.registerUserController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userexist = await registrationModel.findOne({ email: req.body.email });
        if (userexist && userexist?.emailVerify) {
            return res.status(400).json({
                success: false,
                message: "Email already used"
            })
        }
        if (!userexist) {
            const newuser = new registrationModel({
                firstname, lastname, email, password
            });

            const verifyToken = await newuser.getverifyEmailToken();
            await newuser.save({ validateBeforeSave: false });
            const verifyEmailUrl = `${process.env.FRONTENT_URL}/api/v1/email/account/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            await sendEmail({
                email: newuser?.email,
                message
            });
            // res.status(200).json({ success: true, user: newuser })
            sendToken(newuser, 200, res);
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
                message
            });

            // res.status(200).json({ success: true, user:userexist })
            sendToken(userexist, 200, res)
        }


    } catch (error) {
        console.log(error);
        newuser.verifyEmailToken = undefined;
        newuser.verifyEmailExpires = undefined;
        await newuser.save({ validateBeforeSave: false });
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false
        })
    }
}

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
                success: false
            })
        }

        user.verifyEmailToken = undefined;
        user.verifyEmailExpires = undefined;
        user.emailVerify = true;
        await user.save();
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false
        })
    }
}

// setupprofle
exports.setupProfileController = async (req, res) => {
    try {
        const {
            avatar,
            phoneNumber,
            address,
            dateOfBirth,
            experience,
            city,
            job,
            zipcode
        } = req.body;
        const user = await registrationModel.findOne({ _id: req?.user?._id });
        user.phoneNumber = phoneNumber
        user.address = address
        user.dateOfBirth = dateOfBirth
        user.experience = experience
        user.city = city
        user.job = job
        user.zipcode = zipcode
        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Your Profile submitted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",

            sucess: false
        })
    }
}
