"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category_item extends Model {
        static associate(models) {
            Category_item.belongsTo(models.Product, {
                foreignKey: "product_id",
            });
            Category_item.belongsTo(models.Category, {
                foreignKey: "category_id",
            });
        }
    }
    Category_item.init(
        {
            product_id: DataTypes.INTEGER,
            category_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Category_item",
        }
    );
    return Category_item;
};
