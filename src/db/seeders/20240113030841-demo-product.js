"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "products",
            [
                {
                    id: 1,
                    seller_id: 1,
                    name: "Avocado",
                    description: "Fresh One",
                    img_url: "www.image/example.com",
                    stock_level: 50.0,
                    weight: 1.0,
                    price: 2.45,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    seller_id: 1,
                    name: "Grape",
                    description: "Purple One",
                    img_url: "www.image/example2.com",
                    stock_level: 45.0,
                    weight: 1.0,
                    price: 6.35,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", null, {});
    },
};
