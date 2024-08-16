'use strict';

require('dotenv').config({ path: '../../../.env' });
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {

}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        room_name: '1',
        room_number: 1,
        room_floor: 1,
        room_type: 1,
        room_size: 60,
        description: 'fhskjlhfkjhfkshjkfhsadjkhfkjshfjkdsa',
        room_image: '',
        is_avaiable: true,
        pet_allow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        room_name: '2',
        room_number: 2,
        room_floor: 1,
        room_type: 1,
        room_size: 60,
        description: 'fhskjlhfkjhfkshjkfhsadjkhfkjshfjkdsa',
        room_image: '',
        is_avaiable: true,
        pet_allow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        room_name: '3',
        room_number: 3,
        room_floor: 1,
        room_type: 1,
        room_size: 60,
        description: 'fhskjlhfkjhfkshjkfhsadjkhfkjshfjkdsa',
        room_image: '',
        is_avaiable: true,
        pet_allow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        room_name: '4',
        room_number: 4,
        room_floor: 1,
        room_type: 1,
        room_size: 60,
        description: 'fhskjlhfkjhfkshjkfhsadjkhfkjshfjkdsa',
        room_image: '',
        is_avaiable: true,
        pet_allow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        room_name: '5',
        room_number: 5,
        room_floor: 1,
        room_type: 1,
        room_size: 60,
        description: 'fhskjlhfkjhfkshjkfhsadjkhfkjshfjkdsa',
        room_image: '',
        is_avaiable: true,
        pet_allow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        room_name: '6',
        room_number: 6,
        room_floor: 1,
        room_type: 1,
        room_size: 60,
        description: 'fhskjlhfkjhfkshjkfhsadjkhfkjshfjkdsa',
        room_image: '',
        is_avaiable: true,
        pet_allow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const priceData = [];

    for (let product of products) {
      // Create a Stripe product
      const stripeProduct = await stripe.products.create({
        name: product.room_name,
        description: product.description,
      });

      // Add stripe_product_id to the current product
      product.stripe_product_id = stripeProduct.id;

      // Create a Stripe price
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: 1786000, // example amount in the smallest currency unit
        currency: 'vnd',
      });

      // Prepare price data for bulk insert
      priceData.push({
        stripe_price_id: stripePrice.id,
        room_id: product.room_number,
        unit_amount: 1786000,
        currency: 'vnd',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('rooms', products, {}, {});

    await queryInterface.bulkInsert('prices', priceData, {}, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

