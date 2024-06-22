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
                    public_id:"cloudinaryResult.public_id",
                    url: "https://res.cloudinary.com/dbcopekhr/image/upload/v1710947946/profile_ptqoxy.png",
                }
            });

            const verifyToken = await newuser.getverifyEmailToken();
            await newuser.save({ validateBeforeSave: false });
            const verifyEmailUrl = `${process.env.FRONTENT_URL}/api/v2/email/user/account/verify/${verifyToken}`;
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
            userexist.avatar = {
                public_id:"cloudinaryResult.public_id",
                url: "https://res.cloudinary.com/dbcopekhr/image/upload/v1710947946/profile_ptqoxy.png",
            }
            const verifyToken = await userexist.getverifyEmailToken();
            await userexist.save({ validateBeforeSave: false });
            const verifyEmailUrl = `${process.env.FRONTENT_URL}/api/v2/email/user/account/verify/${verifyToken}`;
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


exports.updatePrfileController = async(req,res)=>{
    try {
        const {firstname,lastname} = req.body;
        const user = await UserModel.findOne({_id:req?.user?._id});
        if (!user) {
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }

        user.firstname=firstname;
        user.lastname=lastname

        if (req.file) {
            

            const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

            user.avatar = {
                public_id: cloudinaryResult.public_id,
                url: cloudinaryResult.secure_url,
            };
        }

        await user.save();
        res.status(200).json({
            success:true,
            message:"update successfully"
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