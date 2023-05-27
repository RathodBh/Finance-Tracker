'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    
    static associate(models) {
      transactions.belongsTo(models.users,{
        foreignKey: 'user_id'
      })
    }
  }
  transactions.init({
    transaction_date: DataTypes.STRING,
    month_year: DataTypes.STRING,
    transaction_type: DataTypes.STRING,
    from_account: DataTypes.STRING,
    to_account: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    receipt: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};