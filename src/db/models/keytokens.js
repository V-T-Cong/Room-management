const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const keyToken = sequelize.define("key_tokens", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	user_id: {
		type: Sequelize.INTEGER,
	},
	public_key: {
		type: Sequelize.STRING(2048),
		allowNull: false,
	},
	private_key: {
		type: Sequelize.STRING(2048),
		allowNull: false,
	},
	refresh_tokens: {
	type: Sequelize.STRING(2048),
	allowNull: false,
	},
	refresh_tokens_used: {
		type: Sequelize.ARRAY(Sequelize.STRING(2048)),
		defaultValue: [],
		get() {
			const rawValue = this.getDataValue("refreshTokensUsed");
			return rawValue === null ? [] : rawValue;
		},
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

module.exports = keyToken;
