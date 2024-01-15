"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            // Cart.belongsTo(models.User, {
            //     foreignKey: "customer_id",
            // });
            // Cart.belongsToMany(models.Product, {
            //     through: "Cart_item",
            //     foreignKey: "cart_id",
            // });
            Cart.belongsTo(models.User, { foreignKey: "customer_id" });
            Cart.belongsToMany(models.Product, {
                through: "Cart_item",
                foreignKey: "cart_id",
            });
        }
    }
    Cart.init(
        {
            customer_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Cart",
        }
    );
    return Cart;
};
