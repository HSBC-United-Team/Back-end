"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            seller_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            stock_level: {
                allowNull: true,
                type: Sequelize.DECIMAL(10, 2),
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            img_url: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            weight: {
                allowNull: false,
                type: Sequelize.DECIMAL(10, 2),
            },
            price: {
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
        await queryInterface.dropTable("Products");
    },
};
