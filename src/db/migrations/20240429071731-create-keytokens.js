"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("key_tokens", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'users',
					},
					key: 'id'
				},
			},
			public_key: {
				type: Sequelize.STRING(2048),
				allowNull: false,
			},
			private_key: {
				type: Sequelize.STRING(2048),
				allowNull: false,
			},
			refresh_tokens: {
				type: Sequelize.STRING(2048),
				allowNull: false,
			},
			refresh_tokens_used: {
				type: Sequelize.ARRAY(Sequelize.STRING(2048)),
				defaultValue: [],
				get() {
					// Ensure that even if Sequelize doesn't support default values for arrays,
					// it will return an empty array when querying the field
					const rawValue = this.getDataValue('refreshTokensUsed');
					return rawValue === null ? [] : rawValue;
				},
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
		await queryInterface.dropTable("key_tokens");
	},
};
