"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.User, {
                foreignKey: "seller_id",
            });
            Product.belongsToMany(models.Category, {
                through: "Category_item",
                foreignKey: "product_id",
            });
            Product.belongsToMany(models.Cart, {
                through: "Cart_item",
                foreignKey: "product_id",
            });
            Product.belongsToMany(models.User, {
                through: "Favorite",
                foreignKey: "product_id",
            });
        }
    }
    Product.init(
        {
            seller_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            img_url: DataTypes.STRING,
            weight: DataTypes.DECIMAL,
            price: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
