const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/asyncHandler');
const cartController = require('../../controller/cart.controller');


router.post('/cart/addToCart', asyncHandler(cartController.addToCart));
router.post('/cart/removeCart', asyncHandler(cartController.removeCart));
router.post('/cart/view', asyncHandler(cartController.viewCart));

module.exports = router;