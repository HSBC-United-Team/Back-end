"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cart_items", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cart_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "carts",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            product_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "products",
                    key: "id",
                },
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            subtotal_price: {
                allowNull: false,
                type: Sequelize.DECIMAL(10, 2),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Cart_items");
    },
};
