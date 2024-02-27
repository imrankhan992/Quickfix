const express = require("express");
const { registerUserController,verifyEmailController } = require("../../../controllers/Service_Provider/ServiceProviderController");
const router = express.Router();
router.route("/serviceProvider/registration").post(registerUserController);
router.route("/verify/:token").get(verifyEmailController);
module.exports =router