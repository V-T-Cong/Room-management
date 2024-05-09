"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Keytokens extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Keytokens.init(
		{
			UserId: DataTypes.INTEGER,
			publickey: DataTypes.STRING(2048),
			privatekey: DataTypes.STRING(2048),
			refreshTokensUsed: DataTypes.ARRAY(DataTypes.STRING),
			refreshToken: DataTypes.STRING(2048),
		},
		{
			sequelize,
			freezeTableName:true,
			modelName: "keytokens",
		}
	);
	return Keytokens;
};
