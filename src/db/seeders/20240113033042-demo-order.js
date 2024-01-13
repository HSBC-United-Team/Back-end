"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "orders",
            [
                {
                    id: 1,
                    customer_id: 2,
                    shipping_address: "Kel. Ibuh, Kota Papah, Indonesia",
                    order_status: "pending",
                    total_price: 24.5,
                    weight: 10.0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    customer_id: 2,
                    shipping_address: "Kel. Ibuh, Kota Papah, Indonesia",
                    order_status: "shipped",
                    total_price: 63.5,
                    weight: 10.0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("orders", null, {});
    },
};
