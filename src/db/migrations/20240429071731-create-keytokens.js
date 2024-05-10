"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("keytokens", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			UserId: {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
			},
			publickey: {
				type: Sequelize.STRING(2048),
				allowNull: false,
			},
			privatekey: {
				type: Sequelize.STRING(2048),
				allowNull: false,
			},
			refreshTokensUsed: {
				type: Sequelize.ARRAY(Sequelize.STRING(2048)),
				defaultValue: [],
				get() {
					// Ensure that even if Sequelize doesn't support default values for arrays,
					// it will return an empty array when querying the field
					const rawValue = this.getDataValue('refreshTokensUsed');
					return rawValue === null ? [] : rawValue;
				},
			},
			refreshToken: {
				type: Sequelize.STRING(2048),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("keytokens");
	},
};
