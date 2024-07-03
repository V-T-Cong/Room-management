'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('prices', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			stripe_price_id: {
				type: Sequelize.STRING,
				unique: true
			},
			room_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'rooms',
					},
					key: 'room_id',
				}
			},
			unit_amount: {
				type: Sequelize.INTEGER
			},
			currency: {
				type: Sequelize.CHAR
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
		await queryInterface.dropTable('prices');
	}
};