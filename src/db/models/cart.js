const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Cart = sequelize.define("carts", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	user_id: {
		type: Sequelize.INTEGER
	},
	room_id: {
		type: Sequelize.INTEGER
	},
	quantity: {
		type: Sequelize.INTEGER
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE
	},
	updatedAt: {
		allowNull: false,
		type: DataTypes.DATE
	}
}, 
{
	sequelize,
	freezeTableName: true,
});

module.exports = Cart