require('dotenv').config({ path: '../../../.env' });

const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  
const { asyncHandler } = require('../../helpers/asyncHandler');
const checkoutController = require('../../controller/checkout.controller');
const cartController = require('../../controller/cart.controller');


router.post('/payment', asyncHandler(checkoutController.checkout));

// router.get('/success', async (req, res) => {
//     const result = Promise.all([
//         stripe.checkout.sessions.retrieve(req.query.session_id, {expand: ['payment_intent.payment_method']}),
//         stripe.checkout.sessions.listLineItems(req.query.session_id)
//     ]);

//     console.log(JSON.stringify( await result));
//     res.render('success');
// });
router.get('/success', asyncHandler(checkoutController.handlePaymentSuccess));

router.get('/cancel', (req, res) => {
    res.render('cancel');
});

module.exports = router;