"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, {
                foreignKey: "customer_id",
            });
            Order.hasMany(models.Order_detail, { foreignKey: "order_id" });
            Order.hasOne(models.Invoice);
        }
    }
    Order.init(
        {
            customer_id: DataTypes.INTEGER,
            shipping_address: DataTypes.TEXT,
            order_status: DataTypes.STRING,
            total_price: DataTypes.DECIMAL,
            weight: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
