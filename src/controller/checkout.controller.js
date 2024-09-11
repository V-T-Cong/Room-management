require('dotenv').config({ path: '../../.env' });

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const CartServices = require('../services/cart.services');
const CheckoutServices = require('../services/checkout.services');
const ReceiptServices = require('../services/receipt.services');
const { OK, CREATED, SuccessResponse } = require("../core/success.response");

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
            const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['payment_intent.payment_method']});
            const listItems = await stripe.checkout.sessions.listLineItems( session_id );
            const APIreturn = {session, listItems};
            
            if (session.payment_status === 'paid') {
                const userId = session.metadata.user_id;
                const roomIds = session.metadata.room_ids.split(',').map(Number);
                // Iterate over each room_id and remove the corresponding cart item
                for (const roomId of roomIds) {
                    await CartServices.removeCart({ user_id: userId, room_id: roomId });
                }
                await ReceiptServices.generateReceipt(APIreturn);
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
