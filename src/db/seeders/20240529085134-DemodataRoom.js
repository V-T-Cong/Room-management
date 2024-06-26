'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rooms', [
			{
				room_name: '1',
        room_number: 1,
        room_floor: 1,
        room_type: 1,
        room_size: 60,
        room_price: 3560000,
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
        room_price: 3560000,
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
        room_price: 3560000,
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
        room_price: 3560000,
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
        room_price: 3560000,
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
        room_price: 3560000,
        description: 'fhskjlhfkjhfkshjkfhsadjkhfkjshfjkdsa',
        room_image: '',
        is_avaiable: true,
        pet_allow: true,
        createdAt: new Date(),
				updatedAt: new Date()
			},
		], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
