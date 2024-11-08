const express = require("express");
const multer = require("multer");
const {
    registerUserController,
    verifyEmailController,
    setupProfileController,
    logout,
    setupprofileRouteController,
    loaddata,
    loginUserController,
    submitProfileornot,
} = require("../../../controllers/Service_Provider/ServiceProviderController");
const { isAuthenticated, authorizeRoles } = require("../../../Middleware/auhRegistration");
const registrationModel = require("../../../Models/ServiceProvider/registrationModel");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/serviceProvider/registration").post(registerUserController);
router.route("/verify/:token").get(verifyEmailController);
router.route("/setup").post(isAuthenticated, upload.single("avatar"), setupProfileController);
router.route("/admin/logout").get(logout);
router.route("/user/mydata").get(isAuthenticated, loaddata);
router.route("/login").post(loginUserController);
// protected
router.route("/protected-serviceprovider").get(isAuthenticated,authorizeRoles("serviceprovider"),submitProfileornot)




//  protected
router.route("/profile-setup/protect").get(isAuthenticated, (req, res) => {
    res.status(200).json({
        ok: true,
    });
});
router.route("/profile-setup/email-verified").get(isAuthenticated, async (req, res) => {
    const user = await registrationModel.findOne({ _id: req?.user?._id })

    if (!user) {
        return res.status(404).json({
            ok: false,
        });
    }
    if (!user?.emailVerify) {
        return res.status(200).json({
            ok: false,
        });
    }
    res.status(200).json({
        ok: true,
    });
});

router.route("/profile-setup/protect-data").get(isAuthenticated, setupprofileRouteController);

module.exports = router;
