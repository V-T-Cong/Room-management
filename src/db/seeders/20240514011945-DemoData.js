'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const users = [
			{
				first_name: 'Xabier',
				last_name: 'Alonso Olano',
				gender: 'male',
				email: 'xabiAlonso@gmail.com',
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
				verify: true,
				is_activate: true,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				first_name: 'Luka',
				last_name: 'Modrić ',
				gender: 'male',
				email: '	@gmail.com',
				password: '123456',
				phone_number: '0902390458',
				verify: true,
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
				verify: true,
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
				verify: true,
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
				verify: true,
				is_activate: true,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];

		for (let user of users) {
			user.password = await bcrypt.hash(user.password, saltRounds);
		}

		await queryInterface.bulkInsert('users', users, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
