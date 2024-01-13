"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        static associate(models) {
            Invoice.belongsTo(models.Order, {
                foreignKey: "order_id",
            });
            Invoice.hasOne(models.Payment);
        }
    }
    Invoice.init(
        {
            order_id: DataTypes.INTEGER,
            isPaid: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Invoice",
        }
    );
    return Invoice;
};
