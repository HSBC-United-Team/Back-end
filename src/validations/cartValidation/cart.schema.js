const Joi = require("joi");

const cartSchema = Joi.object({ 
      product_id: Joi.number().required().messages({
        "any.required": "ID Produk harus di isi",
        "number.base": "ID Produk harus berupa angka",
      }),
      quantity: Joi.number().required().min(1).messages({
        "any.required": "Kuantitas harus di isi",
        "number.base": "Kuantitas harus berupa angka",
        "number.min": "Jumlah kuantitas minimal harus 1",
      }),
      subtotal_price: Joi.number().required().positive().messages({
        "any.required": "Harga subtotal harus di isi",
        "number.base": "Harga subtotal harus berupa angka",
        "number.positive": "Harga subtotal harus bernilai positif",
      }),
  });

module.exports = cartSchema;
