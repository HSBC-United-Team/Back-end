"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart_item extends Model {
        static associate(models) {
            Cart_item.belongsTo(models.Product, {
                foreignKey: "product_id",
            });
            Cart_item.belongsTo(models.Cart, { foreignKey: "cart_id" });
        }
    }
    Cart_item.init(
        {
            cart_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            subtotal_price: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Cart_item",
        }
    );
    return Cart_item;
};
