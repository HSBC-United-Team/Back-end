const Joi = require("joi");

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "Username harus diisi",
        "string.empty": "Username tidak boleh kosong",
    }),
    password: Joi.string().required().messages({
        "any.required": "Passowrd harus diisi",
        "string.empty": "Password tidak boleh kosong",
    }),
});

module.exports = loginSchema;