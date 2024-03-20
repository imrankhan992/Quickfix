const express = require("express");
const { userRegistrationController, verifyUserEmailController, updatePrfileController } = require("../../controllers/ServiceConsumer/Registration");
const { isAuthenticated, authorizeRoles } = require("../../Middleware/auhRegistration");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "pictures/" });
router.route("/user/register").post(userRegistrationController);
router.route("/user/update-profile-setting").put(isAuthenticated,authorizeRoles("user"),upload.single("avatar"),updatePrfileController);

router.route("/user/email/verify/:token").get(verifyUserEmailController)
router.route("/user/protected-routes").get(isAuthenticated, authorizeRoles("user"), async (req, res) => {
    res.status(200).json({
        ok: true
    })
});
module.exports = router;