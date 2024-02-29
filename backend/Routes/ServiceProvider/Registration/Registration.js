const express = require("express");
const { registerUserController, verifyEmailController, setupProfileController } = require("../../../controllers/Service_Provider/ServiceProviderController");
const { isAuthenticated } = require("../../../Middleware/auhRegistration");

const router = express.Router();

router.route("/serviceProvider/registration").post(registerUserController);
router.route("/verify/:token").get(verifyEmailController);
router.route("/setup").get(isAuthenticated, setupProfileController);

module.exports = router;
