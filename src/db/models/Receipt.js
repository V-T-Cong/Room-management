const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Receipt = sequelize.define('receipts', {
	id : {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	receipt_number: {
		unique: true,
		type: DataTypes.CHAR
	},
	user_name: {
		type: DataTypes.CHAR
	},
	user_email: {
		type: DataTypes.CHAR
	},
	payment_method_type: {
		type: DataTypes.CHAR
	},
	card_brand: {
		type: DataTypes.CHAR
	},
	card_last4: {
		type: DataTypes.CHAR
	},
	amount_total: {
		type: DataTypes.BIGINT
	},
	currency: {
		type: DataTypes.CHAR
	},
	payment_status: {
		type: DataTypes.CHAR
	},
	receipt_date: {
		allowNull: false,
		type: DataTypes.DATE
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
	},
	updatedAt: {
		allowNull: false,
		type: DataTypes.DATE,
	}
},
{
	sequelize,
	freezeTableName: true,
})

module.exports = Receipt