const express = require('express');
const { postNewOrder, getAllOrder } = require('../../controllers/orders/order.controller');
const { isAuthenticated } = require('../../Middleware/auhRegistration');
const router = express.Router();
router.post("/send", isAuthenticated, postNewOrder)
router.get("/get-orders", isAuthenticated, getAllOrder)
module.exports = router;