const registrationModel = require("../../Models/ServiceProvider/registrationModel");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const { sendToken } = require("../../utils/sendToken");
const cloudinary = require("../../Middleware/cloudinary");
const UserModel = require("../../Models/User/UserModel");
const Transaction = require("../../Models/Transaction/transaction.model");
const AcceptOrder = require("../../Models/Order/AcceptOrder");
const stripe = require('stripe')('sk_test_51PX0FHLhXKwMvDT9RIsWf3w4ZK0qdPXajDHjvcffavOlf3VuPZZ1XeikM4TgArFBTCMZDSBNRESkwCjiWmZlHKvB00pztnZ98m');

exports.registerUserController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const customer = await stripe.customers.create({ email });
        console.log(customer)
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
                stripeCustomerId: customer.id
            });

            const verifyToken = await newuser.getverifyEmailToken();
            await newuser.save({ validateBeforeSave: false });
            const verifyEmailUrl = `https://quickfix-8pw7.onrender.com/api/v1/email/account/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            const html = `
            <body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f9f9f9;margin:0;padding:0"><div style="max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border:1px solid #ddd;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.05)"><div style="text-align:center;padding:20px 0;border-bottom:1px solid #eee"><h1 style="color:#333;font-size:24px;margin-bottom:20px">QuickFix</h1></div><div style="padding:30px;text-align:center"><h1 style="color:#333;font-size:24px;margin-bottom:20px">Email Verification</h1><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Hi ${newuser?.firstname},</p><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Thank you for registering with us. Please click the button below to verify your email address and complete your registration.</p><a href=${verifyEmailUrl} style="display:inline-block;margin-top:20px;padding:15px 30px;background-color:#007bff;color:#fff;text-decoration:none;font-size:16px;border-radius:5px;transition:background-color .3s ease">Verify Email</a></div><div style="margin-top:30px;padding:20px;background-color:#f4f4f4;text-align:center;color:#888;font-size:14px"><p style="margin:5px 0">If you did not create an account, no further action is required.</p><p style="margin:5px 0">&copy; 2024 Your Company Name. All rights reserved.</p><div style="margin-top:10px"><a href="https://facebook.com/yourcompany" style="margin:0 5px"><img src="https://res.cloudinary.com/dbcopekhr/image/upload/v1716362233/facebook_i8p0zu.svg" alt="Facebook" style="width:32px"></a><a href="https://twitter.com/yourcompany" style="margin:0 5px"><img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=ais_user" alt="Twitter" style="width:32px"></a><a href="https://instagram.com/yourcompany" style="margin:0 5px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7-0xfKFBqt9MIsyKA3el52qEj9htrawhjM6ppqNIuQ&s" alt="Instagram" style="width:32px"></a></div></div></div></body>
        `
            // await sendEmail({
            //     email: newuser?.email,
            //     message,
            //     name: newuser?.firstname,
            //     html,
            //     subject: "QuickFix Email Verification"
            // });
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
            const verifyEmailUrl = `https://quickfix-8pw7.onrender.com/api/v1/email/account/verify/${verifyToken}`;
            const message = `Your Email Verify Token is  :- \n\n ${verifyEmailUrl} \n\n if you have not requested this email then, please ignore it`;
            const html = `
            <body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#f9f9f9;margin:0;padding:0"><div style="max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border:1px solid #ddd;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.05)"><div style="text-align:center;padding:20px 0;border-bottom:1px solid #eee"><img src="https://res.cloudinary.com/dbcopekhr/image/upload/v1716362233/facebook_i8p0zu.svg" alt="Your Logo" style="width:150px"></div><div style="padding:30px;text-align:center"><h1 style="color:#333;font-size:24px;margin-bottom:20px">Email Verification</h1><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Hi ${userexist?.firstname},</p><p style="color:#666;line-height:1.6;font-size:16px;margin:15px 0">Thank you for registering with us. Please click the button below to verify your email address and complete your registration.</p><a href=${verifyEmailUrl} style="display:inline-block;margin-top:20px;padding:15px 30px;background-color:#007bff;color:#fff;text-decoration:none;font-size:16px;border-radius:5px;transition:background-color .3s ease">Verify Email</a></div><div style="margin-top:30px;padding:20px;background-color:#f4f4f4;text-align:center;color:#888;font-size:14px"><p style="margin:5px 0">If you did not create an account, no further action is required.</p><p style="margin:5px 0">&copy; 2024 Your Company Name. All rights reserved.</p><div style="margin-top:10px"><a href="https://facebook.com/yourcompany" style="margin:0 5px"><img src="https://res.cloudinary.com/dbcopekhr/image/upload/v1716362233/facebook_i8p0zu.svg" alt="Facebook" style="width:32px"></a><a href="https://twitter.com/yourcompany" style="margin:0 5px"><img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=ais_user" alt="Twitter" style="width:32px"></a><a href="https://instagram.com/yourcompany" style="margin:0 5px"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7-0xfKFBqt9MIsyKA3el52qEj9htrawhjM6ppqNIuQ&s" alt="Instagram" style="width:32px"></a></div></div></div></body>
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

        console.log(error);
        res.status(500).json({
            message: error.message,
            error,
            success: false,
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
            currentlocation
        } = req.body;
        const user = await registrationModel.findOne({ _id: req?.user?._id });
        user.phoneNumber = phoneNumber;
        user.address = address;
        user.dateOfBirth = dateOfBirth;
        user.experience = experience;
        user.city = city;
        user.job = job;
        user.zipcode = zipcode;
        user.currentlocation = {
            lat: currentlocation.lat,
            lng: currentlocation.lng
        }
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
            secure: 'production', // Match the original cookie setting
            sameSite: 'none', // Match the original cookie setting
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
        const user = await UserModel.findOne({ _id: req?.user?._id });
        const serviceprovider = await registrationModel.findOne({ _id: req?.user?._id });
        console.log(serviceprovider);
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
                success: true,
            });
        }
        if (serviceprovider) {
            return res.status(200).json({
                user: serviceprovider,
                message: "User  found",
                success: true,
            });
        }
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
            userExist1.activeStatus = "Online"
            await userExist1.save()
            sendToken(userExist1, 200, res)


        } else if (userExist2 && await userExist2.comparePassword(password) && userExist2.emailVerify) {
            userExist2.activeStatus = "Online"
            await userExist2.save()
            sendToken(userExist2, 200, res)

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
        const sp_provider = await registrationModel.find({ emailVerify: true });
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


// Get wallet balance
exports.getWalletBalance = async (req, res) => {
    try {
        const user = await registrationModel.findById(req.params.userId);
        res.status(200).json({ balance: user.walletBalance, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Recharge wallet
exports.rechargeWallet = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const user = await registrationModel.findById(userId);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // amount in cents
            currency: 'pkr',
            customer: user.stripeCustomerId,
        });
        
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// update wallet
exports.updateWallet = async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const user = await registrationModel.findById(userId);
        user.walletBalance += amount;
        // Create a transaction record
        const newTransaction = new Transaction({
            userId: userId,
            type: 'Wallet recharge',
            amount: amount,
            description: 'Wallet recharge',
        });
        await newTransaction.save();
        await user.save();
       
        res.status(200).json({ balance: user.walletBalance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// get all transaction of user 
// exports.getallTransaction = async (req, res) => {
//     try {
//         const id = req.user._id
        
//         const transactions = await Transaction.find({ userId: id });
        
//         res.status(200).json({ transactions, success: true });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


exports.getallTransaction = async (req, res) => {
    try {
        const id = req.user._id;

        // Fetch and sort transactions based on createdAt in descending order
        const transactions = await Transaction.find({ userId: id }).sort({ createdAt: -1 });

        res.status(200).json({ transactions, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllRevenue= async (req, res) => {
    try {
      let totalRevenue = 0;
      let hasMore = true;
      let startingAfter = null;
  
      // Fetch all charges and calculate total revenue
      while (hasMore) {
        const params = { limit: 100 };
        if (startingAfter) {
          params.starting_after = startingAfter;
        }
        const charges = await stripe.charges.list(params);
  
        charges.data.forEach(charge => {
          totalRevenue += charge.amount;
        });
  
        hasMore = charges.has_more;
        if (hasMore) {
          startingAfter = charges.data[charges.data.length - 1].id;
        }
      }
  
      // Stripe returns amount in cents, convert it to dollars
      totalRevenue = totalRevenue / 100;
  
      res.json({ totalRevenue });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  