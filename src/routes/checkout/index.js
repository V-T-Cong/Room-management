require('dotenv').config({ path: '../../../.env' });

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/checkout', async(req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Node.js and express book'
                    },
                    unit_amount: 50 * 100
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/complete`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    })
    console.log(session.url);
    res.redirect(session.url);
});

router.get('/complete', (req, res) => {
    res.send('Your payment was successful');
});

router.get('/cancel', (req, res) => {
    res.redirect('/test')
});

module.exports = router;