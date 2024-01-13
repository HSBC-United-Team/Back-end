"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Favorite_item extends Model {
        static associate(models) {
            Favorite_item.belongsTo(models.Product, {
                foreignKey: "product_id",
            });
            Favorite_item.belongsTo(models.Favorite, {
                foreignKey: "favorite_id",
            });
        }
    }
    Favorite_item.init(
        {
            favorite_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Favorite_item",
        }
    );
    return Favorite_item;
};
