"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("transactions", "user_id", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model:"transactions",
              key: "id",
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("transactions", "user_id");
    },
};
