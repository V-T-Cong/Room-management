'use strict';
const {
  Model
} = require('sequelize');
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
  Keytokens.init({
    UserId: DataTypes.INTEGER,
    publickey: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Keytoken',
  });
  return Keytokens;
};