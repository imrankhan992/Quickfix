const express = require('express');
const { postNewOrder, getAllOrder, sendOffer, getAllOrdersWhichClientPost, getSingleServiceProviderOffer,acceptOffer,getAcceptedOffersServiceProvider, getAcceptedOffersClient, getSingleAcceptedOffer, deleteOrder,  } = require('../../controllers/orders/order.controller');
const { isAuthenticated } = require('../../Middleware/auhRegistration');
const router = express.Router();
router.post("/send", isAuthenticated, postNewOrder)
router.post("/get-orders", isAuthenticated, getAllOrder)
router.post("/send-offer", isAuthenticated, sendOffer)
router.get("/get-client-orders", isAuthenticated, getAllOrdersWhichClientPost)
router.put("/update-order", isAuthenticated, acceptOffer)
router.get("/get-accepted_offers/client", isAuthenticated, getAcceptedOffersClient)
router.get("/get-accepted_offers/client/:id", isAuthenticated, getSingleAcceptedOffer)
router.get("/get-accepted_offers/service_provider", isAuthenticated, getAcceptedOffersServiceProvider)
router.get("/get-accepted_offers/service_provider/:id", isAuthenticated, getSingleServiceProviderOffer)
router.delete("/delete-order/:id", isAuthenticated, deleteOrder)
module.exports = router;