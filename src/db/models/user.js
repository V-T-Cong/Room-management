'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    isActivate: DataTypes.BOOLEAN
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'User',
  });
  return User;
};