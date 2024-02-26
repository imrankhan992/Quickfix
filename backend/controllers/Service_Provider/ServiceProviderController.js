const registrationModel = require("../../Models/ServiceProvider/registrationModel");

exports.registerUserController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const newuser = new registrationModel({
            firstname, lastname, email, password 
        });
        const user =await newuser.save();
        res.status(200).json({success:true,user})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false
        })
    }
}