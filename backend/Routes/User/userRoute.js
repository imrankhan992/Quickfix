const express = require("express");
const {  userRegistrationController, verifyUserEmailController } = require("../../controllers/ServiceConsumer/Registration");
const router = express.Router();
router.route("/user/register").post(userRegistrationController);
router.route("/user/email/verify/:token").get(verifyUserEmailController)
module.exports = router;