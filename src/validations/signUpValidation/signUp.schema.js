const Joi = require("joi");

const signUpSchema = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "Username harus diisi",
        "string.empty": "Username tidak boleh kosong",
    }),
    first_name: Joi.string().required().messages({
        "any.required": "First name harus diisi",
        "string.empty": "First name tidak boleh kosong",
    }),
    last_name: Joi.string().required().messages({
        "any.required": "Last name harus diisi",
        "string.empty": "Last name tidak boleh kosong",
    }),
    email: Joi.string().required().messages({
        "any.required": "Email harus diisi",
        "string.empty": "Email tidak boleh kosong",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password harus diisi",
        "string.empty": "Password tidak boleh kosong",
    }),
    repassword: Joi.string().required().messages({
        "any.required": "Konfirmasi password harus diisi!",
        "string.empty": "Konfirmasi password tidak boleh kosong",
    }),
});

module.exports = signUpSchema;