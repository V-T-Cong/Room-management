const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Receipt = sequelize.define('receipts', {
	id : {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	receipt_id: {
		unique: true,
		type: DataTypes.STRING
	},
	user_name: {
		type: DataTypes.STRING
	},
	user_email: {
		type: DataTypes.STRING
	},
	payment_method_type: {
		type: DataTypes.STRING
	},
	card_brand: {
		type: DataTypes.STRING
	},
	card_last4: {
		type: DataTypes.STRING
	},
	amount_total: {
		type: DataTypes.BIGINT
	},
	currency: {
		type: DataTypes.STRING
	},
	payment_status: {
		type: DataTypes.STRING
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