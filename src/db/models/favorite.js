"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        static associate(models) {
            Favorite.belongsTo(models.User, { foreignKey: "customer_id" });
            Favorite.belongsToMany(models.Product, {
                through: "Favorite_item",
            });
        }
    }
    Favorite.init(
        {
            customer_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Favorite",
        }
    );
    return Favorite;
};
