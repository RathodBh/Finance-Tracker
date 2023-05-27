'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
   
    static associate(models) {
      users.hasMany(models.transactions, {
          foreignKey: "user_id",
      });
    }
  }
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};