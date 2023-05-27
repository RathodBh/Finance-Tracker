'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
        {
            email: "bh@test.com",
            password: "bh",
        },
        {
            email: "dh@test.com",
            password: "dh",
        },
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
  }
};
