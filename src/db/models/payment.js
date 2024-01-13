"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            Payment.belongsTo(models.User, {
                foreignKey: "customer_id",
            });
            Payment.belongsTo(models.Invoice, {
                foreignKey: "invoice_id",
            });
        }
    }
    Payment.init(
        {
            invoice_id: DataTypes.INTEGER,
            customer_id: DataTypes.INTEGER,
            method: DataTypes.STRING,
            amount: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Payment",
        }
    );
    return Payment;
};
