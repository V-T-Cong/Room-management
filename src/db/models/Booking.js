"use strict";

const {Sequelize} = require('sequelize');
const sequelize = require("../../config/database");
const User = require('./User')


const Booking = sequelize.define("bookings", {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	user_id: {
		type: Sequelize.INTEGER,
		references: {
			model: {
				tableName: 'users'
			},
			key: 'id'
		}
	},
	room_id: {
		type: Sequelize.INTEGER,
		references: {
			model: {
				tableName: 'rooms'
			},
			key: 'room_id'
		}
	},
	checkin_time: {
		type: Sequelize.DATE
	},
	checkout_time: {
		type: Sequelize.DATE
	},
	status: {
		type: Sequelize.BOOLEAN
	}
}, 
{
	sequelize,
	freezeTableName:true,
});

Booking.hasMany(User, {
	foreignKey: 'user_id'
});
User.belongsTo(Booking)

module.exports = Booking; 