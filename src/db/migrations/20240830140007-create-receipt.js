'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('receipts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			receipt_number: {
				unique: true,
				type: Sequelize.STRING
			},
			user_name: {
				type: Sequelize.STRING
			},
			user_email: {
				type: Sequelize.STRING,
				references: {
					model: {
						tableName: 'users'
					},
					key: 'email'
				}
			},
			payment_method_type: {
				type: Sequelize.STRING
			},
			card_brand: {
				type: Sequelize.STRING
			},
			card_last4: {
				type: Sequelize.STRING
			},
			amount_total: {
				type: Sequelize.BIGINT
			},
			currency: {
				type: Sequelize.STRING
			},
			payment_status: {
				type: Sequelize.STRING
			},
			receipt_date: {
				allowNull: false,
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('receipts');
	}
};