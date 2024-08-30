require('dotenv').config({ path: '../../.env' });


const Price = require('../db/models/price');
const CartServices = require('./cart.services');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


class CheckoutServices {

    static checkOutPayment = async(user_id) => {

        const cartItems = await CartServices.getCartItems(user_id);

        const itemPrices = [];
        for(const item of cartItems) {
            const price = await Price.findOne({where: {room_id: item.room_id}});
            itemPrices.push(price);
        }

        // make the line Items
        const lineItems = cartItems.map(room => {
            const priceData = itemPrices.find(price => price.room_id === room.room_id )
            if (priceData) {
                return {
                    price_data: {
                        currency: priceData.currency.trim(),
                        product_data: {
                            name: room.room_name,
                            description: room.description,
                            images: room.room_image ? [room.room_image] : [],
                        },
                        unit_amount: priceData.unit_amount,
                    },
                    quantity: 1, // Adjust this if needed
                };
            }
            return null;
        }).filter(item => item !== null);

        const checkout =  await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/v1/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/v1/api/checkout/cancel`,
        })
        
        return checkout;    
    }
}

module.exports = CheckoutServices;