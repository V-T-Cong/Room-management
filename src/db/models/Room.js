const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Room = sequelize.define("Rooms", {
	room_id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	room_name: {
		type: Sequelize.STRING
	},
	room_number: {
		type: Sequelize.INTEGER,
		unique: true
	},
	room_floor: {
		type: Sequelize.INTEGER,
	},
	room_type: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	room_size: {
		type: Sequelize.STRING
	},
	room_price: {
		type: Sequelize.INTEGER
	},
	description: {
		type: Sequelize.STRING
	},
	room_image: {
		type: Sequelize.STRING
	},
	is_avaiable: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	pet_allow: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
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

Room.associate = function(models) {
	Room.belongsTo(models.Type, {
		foreignKey: 'id',
		as: 'type'
	});
};

module.exports = Room;