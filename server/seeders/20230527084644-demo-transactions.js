"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "transactions",
            [
                {
                    transaction_date: "25/05/2023",
                    month_year: "Jun 2023",
                    transaction_type: "Home Expense",
                    from_account: "My Dream Home",
                    to_account: "Real Living",
                    notes: "First Note",
                    amount: 12345,
                    user_id: 1
                },
                {
                    transaction_date: "23/05/2023",
                    month_year: "Feb 2023",
                    transaction_type: "Home Expense",
                    from_account: "My Dream Home",
                    to_account: "Real Living",
                    notes: "First Note",
                    amount: 12345,
                    user_id: 2
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
