const express = require("express");
const { registerUserController } = require("../../../controllers/Service_Provider/ServiceProviderController");
const router = express.Router();
router.route("/").get(registerUserController);
module.exports =router