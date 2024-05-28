'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		await queryInterface.bulkInsert('types', [
			{
				room_type: 'Deluxe',
				description: 'Deluxe room',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				room_type: 'Business',
				description: 'Business room',
				createdAt: new Date(),
				updatedAt: new Date()
			},	
			{
				room_type: 'Standard',
				description: 'Standard room',
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
