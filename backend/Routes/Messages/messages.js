const express = require('express');
const { isAuthenticated } = require('../../Middleware/auhRegistration');
const { sendMessage, getMessages } = require('../../controllers/Messages/messages.controller');
const router = express.Router();
router.post("/send/:id", isAuthenticated,sendMessage )
router.get("/get-all-messages/:id", isAuthenticated,getMessages )

module.exports = router;