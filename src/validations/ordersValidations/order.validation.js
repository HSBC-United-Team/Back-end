const ErrorHandler = require("../../middlewares/errorHandler");
const {
    newOrderSchema,
    singleOrderSchema,
    updateOrderStatusSchema,
} = require("./order.schema");

const newOrderValidation = (shipping_address, total_price, weight, cart_id) => {
    const { error } = newOrderSchema.validate(
        shipping_address,
        total_price,
        weight,
        cart_id
    );

    if (error) {
        throw new ErrorHandler(error.message, 400);
    }

    return true;
};

const singleOrderValidation = (order_id) => {
    const { error } = singleOrderSchema.validate(order_id);

    if (error) {
        throw new ErrorHandler(error.message, 400);
    }

    return true;
};

const updateOrderStatusValidation = (order_id, updatedStatus) => {
    if (singleOrderValidation(order_id)) {
        const { error } = updateOrderStatusSchema(updatedStatus);

        if (error) {
            throw new ErrorHandler(error.message, 400);
        }
    }
};

module.exports = {
    newOrderValidation,
    singleOrderValidation,
    updateOrderStatusValidation,
};
