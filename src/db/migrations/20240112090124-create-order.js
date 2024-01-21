"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            customer_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            shipping_address: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            order_status: {
                allowNull: false,
                defaultValue: "pending",
                type: Sequelize.ENUM(
                    "pending",
                    "waiting for confirmation",
                    "processed",
                    "shipped",
                    "delivered",
                    "cancelled"
                ),
            },
            total_price: {
                allowNull: false,
                type: Sequelize.DECIMAL(10, 2),
            },
            weight: {
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
        await queryInterface.dropTable("Orders");
    },
};
