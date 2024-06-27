const express = require('express');
const { postNewOrder, getAllOrder, sendOffer, getAllOrdersWhichClientPost,updateOrderStatusByProvider, updateOrderStatusByClient,getSingleServiceProviderOffer,acceptOffer,getAcceptedOffersServiceProvider, getAcceptedOffersClient, getSingleAcceptedOffer, deleteOrder, getAllAcceptedOrdersByClient,  } = require('../../controllers/orders/order.controller');
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
router.put("/update-order-status/client/:id", isAuthenticated, updateOrderStatusByClient)
router.put("/update-order-status/provider/:id", isAuthenticated, updateOrderStatusByProvider)
router.get("/get-all-accepted-order-by-client", isAuthenticated, getAllAcceptedOrdersByClient)
module.exports = router;