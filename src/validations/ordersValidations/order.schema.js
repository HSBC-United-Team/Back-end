const Joi = require("joi");

const newOrderSchema = Joi.object({
    shipping_address: Joi.string().required().messages({
        "any.required": "Alamat pengiriman harus diisi harus diisi",
        "string.empty": "Alamat pengiriman tidak boleh kosong",
    }),
    total_price: Joi.number().required().messages({
        "any.required": "Total harga order harus diisi",
        "number.base": "Total harga order harus dalam angka",
        "number.empty": "Total harga order tidak boleh kosong",
    }),
    weight: Joi.number().required().messages({
        "any.required": "Total berat order harus diisi",
        "number.base": "Total berat order dalam angka",
        "number.empty": "Total berat order boleh kosong",
    }),
    cart_id: Joi.number().required().messages({
        "any.required": "Id cart harus diisi",
        "number.base": "Id cart dalam angka",
        "number.empty": "Id cart boleh kosong",
    }),
});

const singleOrderSchema = Joi.object({
    order_id: Joi.number().required().messages({
        "any.required": "Id order harus diisi",
        "number.base": "Id order harus dalam angka",
        "number.empty": "Id order tidak boleh kosong",
    }),
});

const orderStatusEnum = [
    "pending",
    "waiting for confirmation",
    "processed",
    "shipped",
    "delivered",
];

const updateOrderStatusSchema = Joi.object({
    updatedStatus: Joi.string()
        .valid(...orderStatusEnum)
        .required()
        .messages({
            "any.required": "Status terbaru dari order harus ada.",
            "any.only": `Status order terbaru harus salah satu dari ${orderStatusEnum.map(
                (orderStatus) => orderStatus
            )}`,
        }),
});

module.exports = {
    newOrderSchema,
    singleOrderSchema,
    updateOrderStatusSchema,
};
