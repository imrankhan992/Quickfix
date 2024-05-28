const express = require('express');
const { postNewOrder, getAllOrder, sendOffer, getAllOrdersWhichClientPost, acceptOffer, getAcceptedOffersClient, getSingleAcceptedOffer,  } = require('../../controllers/orders/order.controller');
const { isAuthenticated } = require('../../Middleware/auhRegistration');
const router = express.Router();
router.post("/send", isAuthenticated, postNewOrder)
router.post("/get-orders", isAuthenticated, getAllOrder)
router.post("/send-offer", isAuthenticated, sendOffer)
router.get("/get-client-orders", isAuthenticated, getAllOrdersWhichClientPost)
router.put("/update-order", isAuthenticated, acceptOffer)
router.get("/get-accepted_offers/client", isAuthenticated, getAcceptedOffersClient)
router.get("/get-accepted_offers/client/:id", isAuthenticated, getSingleAcceptedOffer)
module.exports = router;