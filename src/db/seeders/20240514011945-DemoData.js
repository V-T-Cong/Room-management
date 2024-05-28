'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		await queryInterface.bulkInsert('users',
			[
				{
					first_name: 'Xabier',
					last_name: 'Alonso Olano',
					gender: 'male',
					email: 'xabiAlonso1@gmail.com',
					password: '123456',
					phone_number: '0902390458',
					verify: true,
					is_activate: true,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					first_name: 'Toni',
					last_name: 'Kroos',
					gender: 'male',
					email: 'ToniKroos@gmail.com',
					password: '123456',
					phone_number: '0902390458',
					is_activate: true,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					first_name: 'Luka',
					last_name: 'Modrić ',
					gender: 'male',
					email: 'LukaModrić@gmail.com',
					password: '123456',
					phone_number: '0902390458',
					is_activate: true,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					first_name: 'Kylian',
					last_name: 'Mbappé Lottin',
					gender: 'male',
					email: 'KylianMbappé@gmail.com',
					password: '123456',
					phone_number: '0902390458',
					is_activate: true,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					first_name: 'Aurélien',
					last_name: 'Djani Tchouaméni',
					gender: 'male',
					email: 'AurélienTchouaméni@gmail.com',
					password: '123456',
					phone_number: '0902390458',
					is_activate: true,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					first_name: 'Harry',
					last_name: 'Edward Kane',
					gender: 'male',
					email: 'HarryKane@gmail.com',
					password: '123456',
					phone_number: '0902390458',
					is_activate: true,
					createdAt: new Date(),
					updatedAt: new Date()
				},
			],
			{});
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
