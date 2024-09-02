require('dotenv').config({ path: '../../.env' });

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const CheckoutServices = require('../services/checkout.services');
const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const CartServices = require('../services/cart.services');

class CheckoutController {
    checkout = async (req, res, next) => {
        try {
            const resultCheckout = await CheckoutServices.checkOutPayment(req.body);
            new SuccessResponse({
                message: 'Checkout successful',
                metadata: resultCheckout,
            }).send(res);
            console.log(resultCheckout.url);
            
        } catch (error) {
            console.error("Error during checkout: ", error);
            next(error);
        }
    }

    handlePaymentSuccess = async (req, res, next) => {
        const session_id = req.query.session_id;
        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);
            if (session.payment_status === 'paid') {
                const userId = session.metadata.user_id; // This is a string "2"
                const roomIds = session.metadata.room_ids.split(',').map(Number);
                // Iterate over each room_id and remove the corresponding cart item
                for (const roomId of roomIds) {
                    await CartServices.removeCart({ user_id: userId, room_id: roomId });
                }
                res.render('success');
            }
            else {
                res.redirect('/cancel')
            }
        } catch (error) {
            console.error("Error handling payment success:", error);
            res.status(500).send("An error occurred while processing your payment.");
        }
    }
}

module.exports = new CheckoutController();
