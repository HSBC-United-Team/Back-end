const ErrorHandler = require("../../middlewares/errorHandler");
const loginSchema = require("./login.schema");

const loginValidation = (username, password) => {
    const { error } = loginSchema.validate({ username, password });

    if (error) {
        throw new ErrorHandler(error.message, 400);
    }

    return true;
};

module.exports = loginValidation;