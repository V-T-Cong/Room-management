'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('rooms', {
			room_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			stripe_product_id: {
				type: Sequelize.STRING,
			},
			room_name: {
				type: Sequelize.STRING
			},
			room_number: {
				type: Sequelize.INTEGER,
				unique: true,
			},
			room_floor: {
				type: Sequelize.INTEGER,
			},
			room_type: {
				type: Sequelize.INTEGER,
				allowNull:false,
				references: {
					model: {
						tableName: 'types',
					},
					key: 'id',
				}
			},
			room_size: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			room_image: {
				type: Sequelize.STRING
			},
			is_avaiable: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			pet_allow: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('rooms');
	}
};