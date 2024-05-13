const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define("api_keys", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	key: {
		type: Sequelize.STRING,
		unique: true
	},
	status: {
		type: Sequelize.BOOLEAN,
		default: true
	},
	permissions: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull: false,
		validate: {
			isIn: [['0000', '1111', '2222']]
		}
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
	freezeTableName:true,
});
