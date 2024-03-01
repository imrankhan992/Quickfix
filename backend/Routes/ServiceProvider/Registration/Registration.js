const express = require("express");
const multer = require("multer");
const {
  registerUserController,
  verifyEmailController,
  setupProfileController,
  logout,
} = require("../../../controllers/Service_Provider/ServiceProviderController");
const { isAuthenticated } = require("../../../Middleware/auhRegistration");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/serviceProvider/registration").post(registerUserController);
router.route("/verify/:token").get(verifyEmailController);
router
  .route("/setup")
  .post(isAuthenticated, upload.single("avatar"), setupProfileController);
router.route("/admin/logout").get(logout);
// admin protected
router.route("/admin/protect-admin").get(isAuthenticated, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});
module.exports = router;
