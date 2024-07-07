const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Price = sequelize.define("prices", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	stripe_price_id: {
		type: DataTypes.STRING,
		unique: true,
	},
	room_id: {
		type: DataTypes.INTEGER,
		references: {
			model: {
				tableName: 'rooms',
			},
			key: 'room_id',
		}
	},
	unit_amount: {
		type: DataTypes.INTEGER,
	},
	currency: {
		type: DataTypes.CHAR,
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
	});

module.exports = Price;
