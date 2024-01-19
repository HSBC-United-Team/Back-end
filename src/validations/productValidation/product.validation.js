const ErrorHandler = require("../../middlewares/errorHandler");
const productSchema = require("./product.schema");

const productValidation = (
    name,
    stock_level,
    description,
    img_url,
    weight,
    price
) => {
    const { error } = productSchema.validate({
        name,
        stock_level,
        description,
        img_url,
        weight,
        price,
    });

    if (error) {
        throw new ErrorHandler(error.message, 400);
    }

    return true;
};

module.exports = productValidation;
