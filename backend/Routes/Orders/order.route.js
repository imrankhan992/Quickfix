const express = require('express');
const { postNewOrder } = require('../../controllers/orders/order.controller');
const router = express.Router();
router.post("/send",postNewOrder)
module.exports = router;