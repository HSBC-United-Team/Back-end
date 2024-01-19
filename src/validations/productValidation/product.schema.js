const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Passowrd harus diisi",
        "string.empty": "Password tidak boleh kosong",
    }),
    stock_level: Joi.number().required().messages({
        "any.required": "Jumlah stok produk harus diisi",
        "number.base": "Jumlah stok harus dalam angka",
        "number.empty": "Jumlah stok tidak boleh kosong",
    }),
    description: Joi.string().required().messages({
        "any.required": "Deskripsi produk harus diisi",
        "string.empty": "Deskripsi produk tidak boleh kosong",
    }),
    img_url: Joi.string().required().messages({
        "any.required": "Gambar harus diisi",
        "string.empty": "Gambar tidak boleh kosong",
    }),
    weight: Joi.number().required().messages({
        "any.required": "Berat produk harus diisi",
        "number.base": "Berat produk harus dalam angka",
        "number.empty": "Berat produk tidak boleh kosong",
    }),
    price: Joi.number().required().messages({
        "any.required": "Harga produk harus diisi",
        "number.base": "Harga produk harus dalam angka",
        "number.empty": "Harga produk tidak boleh kosong",
    }),
});

module.exports = productSchema;
