'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('apiKey', {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER
			},
			key: {
				type: Sequelize.STRING,
				unique: true
			},
			status: {
				type: Sequelize.BOOLEAN,
				default: true
			},
			permissions: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: false,
				validate: {
					isIn: [['0000', '1111', '2222']]
				}
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
		await queryInterface.dropTable('apiKey');
	}
};	