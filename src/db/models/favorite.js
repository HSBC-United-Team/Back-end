"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        static associate(models) {
            Favorite.belongsTo(models.User, {
                foreignKey: "customer_id",
            });

            Favorite.belongsTo(models.Product, {
                foreignKey: "product_id",
            });
        }
    }
    Favorite.init(
        {
            customer_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Favorite",
        }
    );
    return Favorite;
};
