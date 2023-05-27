'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        transaction_date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        month_year: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        transaction_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        from_account: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        to_account: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        receipt: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: Sequelize.DATE,
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};