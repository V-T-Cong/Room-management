require('dotenv').config({ path: '../../.env' });

const Room = require('../db/models/Room');
const Price = require('../db/models/price');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


class CheckoutServices {
    static checkOutPayment = async(data) => {
        const roomNumberId = data.room_id;
        console.log("roomNumberId::", roomNumberId);
        const room = await Room.findAll({ 
            where: {room_id: roomNumberId},
            include: [
                {
                    model: Price,
                    as: 'prices',
                    required: false
                }
            ]
        });

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            
            success_url: `${process.envBASE_URL}/success`,
            cancel_url: `${process.envBASE_URL}/cancel`
        })
        return room;
    }
}

module.exports = CheckoutServices;