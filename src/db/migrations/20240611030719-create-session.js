"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("sessions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sid: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			sess: {
				type: Sequelize.JSON,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'users',
					},
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			expire: {
				allowNull: false,
				type: Sequelize.DATE,
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("sessions");
	},
};
