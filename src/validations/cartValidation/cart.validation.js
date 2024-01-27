const ErrorHandler = require("../../middlewares/errorHandler");
const cartSchema = require("./cart.schema");

const cartValidation = (product_id, quantity, subtotal_price) => {
  const { error } = cartSchema.validate({
    product_id, 
    quantity, 
    subtotal_price
  });

  if (error) {
    throw new ErrorHandler(error.message, 400);
  }

  return true;
};

module.exports = cartValidation;
