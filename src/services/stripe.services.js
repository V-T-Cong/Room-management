require('dotenv').config({ path: '../../.env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createStripeCustomerId = async(email, firstName, lastName, phoneNumber) => {
    try {
        const customer = await stripe.customers.create({
            email: email,
            phone: phoneNumber,
            name : `${firstName} ${lastName}`,
        })
        return customer.id;
    } catch (error) {
        console.error("Error creating Stripe customer:", error);
        throw error;
    }
}

const createStripeProductId = async(name, description) => {
    try {
        const product = await stripe.products.create({
            name: name,
            description: description,
        });
        return product;
    } catch (error) {
        console.error("Error create product and price:", error);
    }
}

const createStripePriceId = async(unit_amount, productId) => {
    const price = await stripe.prices.create({
        product: productId,
        unit_amount: unit_amount,
        currency: 'vnd',
    });
    return price;
}

module.exports = {
    createStripeCustomerId,
    createStripeProductId,
    createStripePriceId
};