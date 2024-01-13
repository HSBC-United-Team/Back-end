"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    id: 1,
                    username: "ToddyG",
                    email: "toddyg@gmail.com",
                    password: "toddyg1",
                    first_name: "Toddy",
                    last_name: "Gerard",
                    role: "seller",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    username: "Btonny",
                    email: "billtony@gmail.com",
                    password: "btonny2",
                    first_name: "Bill",
                    last_name: "Tony",
                    role: "customer",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
