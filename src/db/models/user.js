const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const keyTokens = require("./KeyTokens");

const user = sequelize.define("users", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	first_name: {
		type: Sequelize.STRING,
	},
	last_name: {
		type: Sequelize.STRING,
	},
	gender: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	phone_number: {
		type: Sequelize.STRING,
	},
	verify: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	is_activate: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
}, 
{
	sequelize,
	freezeTableName:true,
});

user.hasOne(keyTokens, {foreignKey: 'user_id'});
keyTokens.belongsTo(user, {foreignKey: 'user_id'});

module.exports = user;