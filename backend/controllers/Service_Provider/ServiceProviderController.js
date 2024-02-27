const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto")
exports.registerUserController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userexist = await registrationModel.findOne({ email: req.body.email });
        if (userexist &&userexist?.emailVerify) {
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
            const verifyEmailUrl = `${process.env.FRONTENT_URL}/api/v1/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            await sendEmail({
                email: newuser?.email,
                message
            });
            res.status(200).json({ success: true, user:newuser })
        }

       if (userexist && !userexist?.emailVerify) {
        const { firstname, lastname, email, password } = req.body;
        userexist.firstname=firstname;
        userexist.lastname=lastname;
        userexist.email=email;
        userexist.password=password;
        const verifyToken = await userexist.getverifyEmailToken();
        await userexist.save({ validateBeforeSave: false });
        const verifyEmailUrl = `${process.env.FRONTENT_URL}/api/v1/verify/${verifyToken}`;
        const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
        await sendEmail({
            email: userexist?.email,
            message
        });
        res.redirect('http://localhost:5173/verifyemail');
        // res.status(200).json({ success: true, user:userexist })
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
                sucess: false 
            })
        }

        user.verifyEmailToken = undefined;
        user.verifyEmailExpires = undefined;
        user.emailVerify=true;
        await user.save();
        res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false
        })
    }
}