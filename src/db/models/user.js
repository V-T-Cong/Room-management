const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const KeyTokens = require('./KeyTokens');
const Session = require("./session");
const Cart = require('./cart')

const User = sequelize.define("users", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	customer_id: {
		type: Sequelize.STRING,
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
KeyTokens.belongsTo(User, {foreignKey: 'id'});

User.hasOne(Session, {foreignKey: 'user_id'});
Session.belongsTo(User, {foreignKey: 'id'});

User.hasMany(Cart, {foreignKey: 'user_id'});
Cart.belongsTo(User, {foreignKey: 'id'});

module.exports = User;