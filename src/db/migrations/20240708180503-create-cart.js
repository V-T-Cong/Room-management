'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('carts', {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
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
						tableName: 'rooms',
					},
					key: 'room_id'
				}
			},
			quantity: {
				type: Sequelize.INTEGER
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
		await queryInterface.dropTable('carts');
	}
};