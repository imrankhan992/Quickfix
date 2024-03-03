const express = require("express");
const multer = require("multer");
const { isAuthenticated, authorizeRoles } = require("../../Middleware/auhRegistration");
const router = express.Router();
// protected routes admin
router.route("/admin/protected-routes").get(isAuthenticated,authorizeRoles("user"),async(req,res)=>{
    res.status(200).json({
        ok:true
    })
});

module.exports = router;