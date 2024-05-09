"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ApiKeys extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ApiKeys.init(
		{
			key:{ 
				type: DataTypes.STRING,
				unique: true
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: true
			},
			permissions: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
				validate: {
					isIn: [["0000", "1111", "2222"]],
				},
			},
		},
		{
			sequelize,
			freezeTableName:true,
			modelName: "apikeys",
		}
	);
	return ApiKeys;
};
