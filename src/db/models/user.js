const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const KeyTokens = require("./KeyTokens");
const Session = require("./session");

const User = sequelize.define("users", {
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

User.hasOne(KeyTokens, {foreignKey: 'user_id'});
KeyTokens.belongsTo(User, {foreignKey: 'user_id'});

User.hasOne(Session, {foreignKey: 'user_id'});
Session.belongsTo(User, {foreignKey: 'user_id'});

module.exports = User;