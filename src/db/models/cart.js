const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Cart = sequelize.define("carts", {
	cart_id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	user_id: {
		type: DataTypes.INTEGER
	},
	room_id: {
		type: DataTypes.INTEGER
	},
	quantity: {
		type: DataTypes.INTEGER
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