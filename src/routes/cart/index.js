const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/asyncHandler');
const cartController = require('../../controller/cart.controller');


router.post('/view', asyncHandler(cartController.viewCart));
router.get('/getCartItem', asyncHandler(cartController.getCartItem));
router.post('/addToCart', asyncHandler(cartController.addToCart));
router.post('/removeCart', asyncHandler(cartController.removeCart));

module.exports = router;