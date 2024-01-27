const { Error } = require("sequelize");
const { Cart, Cart_item, Product } = require("../db/models");
const ErrorHandler = require("../middlewares/errorHandler");
const cartValidation = require("../validations/cartValidation/cart.validation");

const getCarts = async (req, res) => {
    try {
        const { user_id } = req.user;
        const carts = await Cart.findOne({
            where: { customer_id: user_id },
            attributes: ["id"],
            include: {
                model: Product,
                attributes: ["name", "price", "img_url"],
                through: { attributes: ["id", "quantity", "subtotal_price"] },
            },
        });

        if (!carts) {
            throw new ErrorHandler("Anda belum punya product di cart!", 404);
        }

        res.status(200).json({
            message: "Berhasil mendapatkan Cart!",
            carts,
        });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const addToCart = async (req, res) => {
    const { product_id, quantity, subtotal_price } = req.body;

    try {
        const { user_id } = req.user;

        const cart = await Cart.findOne({
            where: { customer_id: user_id },
            include: { model: Product },
        });

        if (!cart) {
            cart = await Cart.create({ customer_id: user_id });
        }

        const cartValidationResult = cartValidation(
            product_id,
            quantity,
            subtotal_price
        );

        if (cartValidationResult) {
            const existingCartItem = await Cart_item.findOne({
                where: { cart_id: cart.id, product_id },
            });

            if (existingCartItem) {
                await existingCartItem.update({
                    quantity: existingCartItem.quantity + quantity,
                    subtotal_price:
                        existingCartItem.subtotal_price + subtotal_price,
                });
            } else {
                await Cart_item.create({
                    cart_id: cart.id,
                    product_id,
                    quantity,
                    subtotal_price,
                });
            }

            res.status(201).json({
                message: "Berhasil ditambahkan ke cart!",
                cart,
            });
        } else {
            res.status(400).json({ Error: "Data cart tidak valid" });
        }
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const updateCart = async (req, res) => {
    const { cart_id, product_id, quantity, subtotal_price } = req.body;
    try {
        const cart = await Cart.findOne({
            where: { id: cart_id },
            include: { model: Product },
        });

        if (!cart) {
            return res
                .status(404)
                .json({ message: "Cart tersebut tidak ada!" });
        }

        const validationResult = cartValidation(
            product_id,
            quantity,
            subtotal_price
        );

        if (validationResult) {
            const existingCartItem = await Cart_item.findOne({
                where: { cart_id: cart.id, product_id },
            });

            if (!existingCartItem) {
                return res.status(404).json({
                    message: "Cart item tersebut tidak ada!",
                });
            }

            await existingCartItem.update({ quantity, subtotal_price });

            res.status(200).json({
                message: "Berhasil mengubah Cart!",
                cart,
            });
        } else {
            res.status(400).json({ Error: "Data cart salah" });
        }
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { cart_id, product_id } = req.body;

        // Validate product_id and cart_id are numbers
        if (isNaN(product_id) || isNaN(cart_id)) {
            return res
                .status(400)
                .json({ Error: "product_id or cart_id salah" });
        }

        const cart = await Cart.findOne({
            where: { id: cart_id },
            include: { model: Product },
        });

        if (!cart) {
            return res
                .status(404)
                .json({ message: "Cart tersebut tidak ada!" });
        }

        const existingCartItem = await Cart_item.findOne({
            where: { cart_id: cart.id, product_id },
        });

        if (!existingCartItem) {
            return res
                .status(404)
                .json({ message: "Cart item tersebut tidak ada!" });
        }

        await existingCartItem.destroy();

        res.status(200).json({
            message: "Berhasil menghapus Cart item!",
        });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    getCarts,
    addToCart,
    updateCart,
    deleteCart,
};
