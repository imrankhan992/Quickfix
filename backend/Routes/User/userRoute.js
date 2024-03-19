const express = require("express");
const { userRegistrationController, verifyUserEmailController } = require("../../controllers/ServiceConsumer/Registration");
const { isAuthenticated, authorizeRoles } = require("../../Middleware/auhRegistration");
const router = express.Router();
router.route("/user/register").post(userRegistrationController);
router.route("/user/email/verify/:token").get(verifyUserEmailController)
router.route("/user/protected-routes").get(isAuthenticated, authorizeRoles("user"), async (req, res) => {
    res.status(200).json({
        ok: true
    })
});
module.exports = router;