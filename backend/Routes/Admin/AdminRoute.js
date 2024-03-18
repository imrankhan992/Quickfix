const express = require("express");
const multer = require("multer");
const { isAuthenticated, authorizeRoles, isIserAuthenticated } = require("../../Middleware/auhRegistration");
const { getallServiceprovider } = require("../../controllers/Service_Provider/ServiceProviderController");
const { countingController, loadAdminData, updateAccountController, getsingleServiceProviderController, createCategoryController, getallcategoryiesController, deleteCategoryController, updateCategoryController, createProductController, getallProductsController, deleteProductController, updateProductController, singleProductController, logout } = require("../../controllers/Admin/Admincontroller");
const router = express.Router();
const upload = multer({ dest: "pictures/" });
router.route("/admin/get-all-sp-provider").get(isIserAuthenticated, authorizeRoles("admin"), getallServiceprovider)
router.route("/admin/counting").get(isIserAuthenticated, authorizeRoles("admin"), countingController)
router.route("/admin/mydata").get(isIserAuthenticated, authorizeRoles("admin"), loadAdminData)
router.route("/admin/get-single-applicant/:id").post(isIserAuthenticated, authorizeRoles("admin"), updateAccountController).get(isIserAuthenticated, authorizeRoles("admin"), getsingleServiceProviderController)
router.route("/admin/create-services").post(isIserAuthenticated, authorizeRoles("admin"), createCategoryController)
router.route("/admin/get-all-categories").get(getallcategoryiesController)
router.route("/admin/delete-category/:id").delete(isIserAuthenticated, authorizeRoles("admin"), deleteCategoryController)
router.route("/admin/update-category/:id").put(isIserAuthenticated, authorizeRoles("admin"), updateCategoryController)
router.route("/admin/create-product").post(isIserAuthenticated, authorizeRoles("admin"), upload.single("picture"), createProductController)
router.route("/admin/get-all-products").get(getallProductsController)
router.route("/admin/delete-product/:id").delete(isIserAuthenticated, authorizeRoles("admin"), deleteProductController)
router.route("/admin/update-product/:id").put(isIserAuthenticated, authorizeRoles("admin"), upload.single("picture"), updateProductController)
router.route("/admin/single-product/:id").get(isIserAuthenticated, authorizeRoles("admin"), singleProductController)
router.route("/logout").get(logout)


// protected routes admin
router.route("/admin/protected-routes").get(isIserAuthenticated, authorizeRoles("admin"), async (req, res) => {
    res.status(200).json({
        ok: true
    })
});

module.exports = router;