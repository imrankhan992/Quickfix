const express = require("express");
const multer = require("multer");
const { isAuthenticated, authorizeRoles, isIserAuthenticated } = require("../../Middleware/auhRegistration");
const { getallServiceprovider } = require("../../controllers/Service_Provider/ServiceProviderController");
const { countingController, loadAdminData, updateAccountController, getsingleServiceProviderController, createCategoryController, getallcategoryiesController, deleteCategoryController, updateCategoryController, createProductController, getallProductsController, getallproductsByCategory,deleteProductController, updateProductController, singleProductController, logout, getsingleServiceById, findserviceProviders } = require("../../controllers/Admin/Admincontroller");
const router = express.Router();
const upload = multer({ dest: "pictures/" });
router.route("/admin/get-all-sp-provider").get(isAuthenticated, authorizeRoles("admin"), getallServiceprovider)
router.route("/admin/counting").get(isAuthenticated, authorizeRoles("admin"), countingController)
router.route("/admin/mydata").get(isAuthenticated, loadAdminData)
router.route("/admin/get-single-applicant/:id").post(isAuthenticated, authorizeRoles("admin"), updateAccountController).get(isAuthenticated, authorizeRoles("admin"), getsingleServiceProviderController)
router.route("/admin/create-services").post(isAuthenticated, authorizeRoles("admin"), createCategoryController)
router.route("/admin/get-all-categories").get(getallcategoryiesController)
router.route("/admin/delete-category/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteCategoryController)
router.route("/admin/update-category/:id").put(isAuthenticated, authorizeRoles("admin"), updateCategoryController)
router.route("/admin/create-product").post(isAuthenticated, authorizeRoles("admin"), upload.single("picture"), createProductController)
router.route("/admin/get-all-products").get(getallProductsController)
router.route("/admin/get-all-products/by-category/:services").get(getallproductsByCategory)
router.route("/admin/delete-product/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteProductController)
router.route("/admin/update-product/:id").put(isAuthenticated, authorizeRoles("admin"), upload.single("picture"), updateProductController)
router.route("/find-serviceproviders/nearme").post(findserviceProviders)
router.route("/single-service/:id").get(getsingleServiceById)

router.route("/logout").get(logout)


// protected routes admin
router.route("/admin/protected-routes").get(isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    res.status(200).json({
        ok: true
    })
});

module.exports = router;