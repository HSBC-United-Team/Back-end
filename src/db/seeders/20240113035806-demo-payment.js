"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "payments",
            [
                {
                    id: 1,
                    invoice_id: 1,
                    customer_id: 2,
                    method: "bank_transfer",
                    amount: 25.5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("payments", null, {});
    },
};
