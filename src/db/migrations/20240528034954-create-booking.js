'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('bookings', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'users'
					},
					key: 'id'
				}
			},
			room_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'rooms'
					},
					key: 'room_id'
				}
			},
			checkin_time: {
				type: Sequelize.DATE
			},
			checkout_time: {
				type: Sequelize.DATE
			},
			status: {
				type: Sequelize.BOOLEAN
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('bookings');
	}
};