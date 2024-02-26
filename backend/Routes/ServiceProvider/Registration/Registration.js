const express = require("express");
const { registerUserController } = require("../../../controllers/Service_Provider/ServiceProviderController");
const router = express.Router();
router.route("/serviceProvider/registration").post(registerUserController);
module.exports =router