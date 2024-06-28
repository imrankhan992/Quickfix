const express = require('express');
const { postNewReview } = require('../../controllers/Reviews/reviews.controller');
const { isAuthenticated } = require('../../Middleware/auhRegistration');


const router = express.Router();
router.put("/review/give-review/:id", isAuthenticated, postNewReview)

module.exports = router;