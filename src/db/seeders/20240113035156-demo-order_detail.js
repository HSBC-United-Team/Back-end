"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "order_details",
            [
                {
                    id: 1,
                    order_id: 1,
                    product_id: 1,
                    subtotal_price: 24.5,
                    quantity: 10.0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    order_id: 2,
                    product_id: 2,
                    subtotal_price: 63.5,
                    quantity: 10.0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("order_details", null, {});
    },
};
