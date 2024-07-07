const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Room = require('./Room')

const Type = sequelize.define("types", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	room_type: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING(2048)
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE
	}
},
{
	sequelize,
	freezeTableName: true,
});

module.exports = Type; 