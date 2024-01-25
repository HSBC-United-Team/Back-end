const { Product } = require("../db/models");
const ErrorHandler = require("../middlewares/errorHandler");
const productValidation = require("../validations/productValidation/product.validation");

const getAllProducts = async (_, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).send({ products });
    } catch (err) {
        const { status = 501, message } = err;
        res.status(status).send({ Error: message });
    }
};

const getProduct = async (req, res) => {
    const { product_id } = req.params;
    try {
        const product = await Product.findOne({ where: { id: product_id } });
        if (product === null) {
            throw new ErrorHandler("Produk tersebut tidak ada", 404);
        }
        res.status(200).send({ product });
    } catch (err) {
        const { status = 501, message } = err;
        res.status(status).send({ Error: message });
    }
};

const addProduct = async (req, res) => {
    const { user_role, user_id } = req.user;
    const { name, description, stock_level, img_url, weight, price } = req.body;
    try {
        if (user_role !== "seller") {
            throw new ErrorHandler("Anda tidak dapat melakukan aksi ini!", 403);
        }

        const validationResult = productValidation(
            name,
            stock_level,
            description,
            img_url,
            weight,
            price
        );

        if (validationResult) {
            await Product.create({
                seller_id: user_id,
                name,
                stock_level,
                description,
                img_url,
                weight,
                price,
            });

            res.status(200).send({ message: `Berhasil menambahkan ${name}` });
        }
    } catch (err) {
        const { status = 501, message } = err;
        res.status(status).send({ Error: message });
    }
};

const updateProduct = async (req, res) => {
    const { product_id } = req.params;
    const { user_role } = req.user;
    const { name, description, stock_level, img_url, weight, price } = req.body;
    try {
        if (user_role !== "seller") {
            throw new ErrorHandler("Anda tidak dapat melakukan aksi ini!", 403);
        }

        const product = Product.findOne({ where: { id: product_id } });

        if (!product) {
            throw new ErrorHandler("Produk tersebut tidak ada", 404);
        }

        const validationResult = productValidation(
            name,
            stock_level,
            description,
            img_url,
            weight,
            price
        );

        if (validationResult) {
            const updatedProduct = {
                ...product,
                name,
                description,
                stock_level,
                img_url,
                weight,
                price,
            };

            await Product.update(
                { ...updatedProduct },
                {
                    where: {
                        id: product_id,
                    },
                }
            );

            res.status(200).send({ message: "Berhasil memperbaharui produk" });
        }
    } catch (err) {
        const { status = 501, message } = err;
        res.status(status).send({ Error: message });
    }
};

const deleteProduct = async (req, res) => {
    const { product_id } = req.params;
    const { user_role } = req.user;
    try {
        if (user_role !== "seller") {
            throw new ErrorHandler("Anda tidak dapat melakukan aksi ini!", 403);
        }

        const product = Product.findByPk(product_id);

        if (!product) {
            throw new ErrorHandler("Produk tidak ditemukan", 404);
        }

        await Product.destroy({ where: { id: product_id } });

        res.status(200).send({ message: "Berhasil menghapus produk" });
    } catch (err) {
        const { status = 501, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
};
