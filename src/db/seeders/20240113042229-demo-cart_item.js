"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "cart_items",
            [
                {
                    id: 1,
                    cart_id: 1,
                    product_id: 1,
                    quantity: 5,
                    subtotal_price: 12.25,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("cart_items", null, {});
    },
};
