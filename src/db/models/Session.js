const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Session = sequelize.define("sessions", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    sid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    sess: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: 'users',
            },
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    expire: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, 
{
    sequelize,
    tableName: 'sessions',
    freezeTableName: true,
	timestamps: true,
});

module.exports = Session;
