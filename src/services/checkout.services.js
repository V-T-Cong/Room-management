require('dotenv').config({ path: '../../.env' });

const Room = require('../db/models/Room');
const Cart = require('../db/models/cart');
const Price = require('../db/models/price');
const CartServices = require('./cart.services');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


class CheckoutServices {

    static checkOutPayment = async(user_id) => {

        const cartItems = CartServices.getCartItems(user_id);

        const lineItems = (await cartItems).map(item => ({
            price_data: {
                currencey: 'vnd',
            },
        }))

        // const session = await stripe.checkout.sessions.create({
        //     mode: 'payment',
            
        //     success_url: `${process.envBASE_URL}/success`,
        //     cancel_url: `${process.envBASE_URL}/cancel`
        // });
        return cartItems;
    }
}

module.exports = CheckoutServices; 