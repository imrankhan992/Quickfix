const express = require("express");
const multer = require("multer");
const { isAuthenticated, authorizeRoles, isIserAuthenticated } = require("../../Middleware/auhRegistration");
const { getallServiceprovider } = require("../../controllers/Service_Provider/ServiceProviderController");
const { countingController, loadAdminData, updateAccountController, getsingleServiceProviderController } = require("../../controllers/Admin/Admincontroller");
const router = express.Router();
router.route("/admin/get-all-sp-provider").get(isIserAuthenticated, authorizeRoles("admin"), getallServiceprovider)
router.route("/admin/counting").get(isIserAuthenticated, authorizeRoles("admin"), countingController)
router.route("/admin/mydata").get(isIserAuthenticated, authorizeRoles("admin"), loadAdminData)
router.route("/admin/get-single-applicant/:id").post(isIserAuthenticated, authorizeRoles("admin"),updateAccountController ).get(isIserAuthenticated,authorizeRoles("admin"),getsingleServiceProviderController)

// protected routes admin
router.route("/admin/protected-routes").get(isIserAuthenticated, authorizeRoles("admin"), async (req, res) => {
    res.status(200).json({
        ok: true
    })
});

module.exports = router;