const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")
const UserModel = require("../../Models/User/UserModel");

const { sendToken } = require("../../utils/sendToken");

exports.userRegistrationController = async (req, res) => {
    try {

        const { firstname, lastname, email, password } = req.body;



        const userexist = await UserModel.findOne({
            email: req.body.email,
        });
        if (userexist && userexist?.emailVerify) {
            return res.status(400).json({
                success: false,
                message: "Email already used",
            });
        }
        const serviceprovider = await registrationModel.findOne({ email })
        if (serviceprovider && serviceprovider?.emailVerify) {
            return res.status(400).json({
                success: false,
                message: "Email already used",
            });
        }
        if (!userexist) {
            const newuser = new UserModel({
                firstname,
                lastname,
                email,
                password,
                avatar: {
                    public_id: "cloudinaryResult.public_id",
                    url: "https://res.cloudinary.com/dbcopekhr/image/upload/v1710947946/profile_ptqoxy.png",
                }
            });

            const verifyToken = await newuser.getverifyEmailToken();
            await newuser.save({ validateBeforeSave: false });
            const verifyEmailUrl = `https://quickfix-8pw7.onrender.com/api/v2/email/user/account/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            const html = `
            <body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f9f9f9;margin:0;padding:0"><div style="max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border:1px solid #ddd;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.05)"><div style="text-align:center;padding:20px 0;border-bottom:1px solid #eee"><h1 style="color:#333;font-size:24px;margin-bottom:20px">QuickFix</h1></div><div style="padding:30px;text-align:center"><h1 style="color:#333;font-size:24px;margin-bottom:20px">Email Verification</h1><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Hi ${newuser?.firstname},</p><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Thank you for registering with us. Please click the button below to verify your email address and complete your registration.</p><a href=${verifyEmailUrl} style="display:inline-block;margin-top:20px;padding:15px 30px;background-color:#007bff;color:#fff;text-decoration:none;font-size:16px;border-radius:5px;transition:background-color .3s ease">Verify Email</a></div><div style="margin-top:30px;padding:20px;background-color:#f4f4f4;text-align:center;color:#888;font-size:14px"><p style="margin:5px 0">If you did not create an account, no further action is required.</p><p style="margin:5px 0">&copy; 2024 Your Company Name. All rights reserved.</p><div style="margin-top:10px"><a href="https://facebook.com/yourcompany" style="margin:0 5px"><img src="https://res.cloudinary.com/dbcopekhr/image/upload/v1716362233/facebook_i8p0zu.svg" alt="Facebook" style="width:32px"></a><a href="https://twitter.com/yourcompany" style="margin:0 5px"><img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=ais_user" alt="Twitter" style="width:32px"></a><a href="https://instagram.com/yourcompany" style="margin:0 5px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7-0xfKFBqt9MIsyKA3el52qEj9htrawhjM6ppqNIuQ&s" alt="Instagram" style="width:32px"></a></div></div></div></body>
        `
            await sendEmail({
                email: newuser?.email,
                message,
                name: newuser?.firstname,
                html,
                subject: "QuickFix Email Verification"
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
            userexist.avatar = {
                public_id: "cloudinaryResult.public_id",
                url: "https://res.cloudinary.com/dbcopekhr/image/upload/v1710947946/profile_ptqoxy.png",
            }
            const verifyToken = await userexist.getverifyEmailToken();
            await userexist.save({ validateBeforeSave: false });
            const verifyEmailUrl = `https://quickfix-8pw7.onrender.com/api/v2/email/user/account/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            const html = `
            <body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f9f9f9;margin:0;padding:0"><div style="max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border:1px solid #ddd;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.05)"><div style="text-align:center;padding:20px 0;border-bottom:1px solid #eee"><h1 style="color:#333;font-size:24px;margin-bottom:20px">QuickFix</h1></div><div style="padding:30px;text-align:center"><h1 style="color:#333;font-size:24px;margin-bottom:20px">Email Verification</h1><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Hi ${userexist?.firstname},</p><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Thank you for registering with us. Please click the button below to verify your email address and complete your registration.</p><a href=${verifyEmailUrl} style="display:inline-block;margin-top:20px;padding:15px 30px;background-color:#007bff;color:#fff;text-decoration:none;font-size:16px;border-radius:5px;transition:background-color .3s ease">Verify Email</a></div><div style="margin-top:30px;padding:20px;background-color:#f4f4f4;text-align:center;color:#888;font-size:14px"><p style="margin:5px 0">If you did not create an account, no further action is required.</p><p style="margin:5px 0">&copy; 2024 Your Company Name. All rights reserved.</p><div style="margin-top:10px"><a href="https://facebook.com/yourcompany" style="margin:0 5px"><img src="https://res.cloudinary.com/dbcopekhr/image/upload/v1716362233/facebook_i8p0zu.svg" alt="Facebook" style="width:32px"></a><a href="https://twitter.com/yourcompany" style="margin:0 5px"><img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=ais_user" alt="Twitter" style="width:32px"></a><a href="https://instagram.com/yourcompany" style="margin:0 5px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7-0xfKFBqt9MIsyKA3el52qEj9htrawhjM6ppqNIuQ&s" alt="Instagram" style="width:32px"></a></div></div></div></body>
        `
            await sendEmail({
                email: userexist?.email,
                message,
                name: userexist?.firstname,
                html,
                subject: "QuickFix Email Verification"
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





exports.verifyUserEmailController = async (req, res) => {
    try {
        const verifyEmailToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");
        const user = await UserModel.findOne({
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


exports.updatePrfileController = async (req, res) => {
    try {
        const { firstname, lastname } = req.body;
        const user = await UserModel.findOne({ _id: req?.user?._id });
        if (!user) {
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }

        user.firstname = firstname;
        user.lastname = lastname

        if (req.file) {


            const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

            user.avatar = {
                public_id: cloudinaryResult.public_id,
                url: cloudinaryResult.secure_url,
            };
        }

        await user.save();
        res.status(200).json({
            success: true,
            message: "update successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false,
        });
    }
}