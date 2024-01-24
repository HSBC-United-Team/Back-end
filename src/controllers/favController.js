const { Error } = require("sequelize");
const { Favorite, Product } = require("../db/models");
const ErrorHandler = require("../middlewares/errorHandler");

const getFavorites = async (req, res) => {
    const { customer_id } = req.body;

    try {
        const currUser = req.user;

        if (currUser.user_id !== customer_id) {
            throw new ErrorHandler("Anda tidak dapat mengakses data ini!", 403);
        }

        const favData = await Favorite.findAll({
            where: { customer_id },
            include: [{ model: Product }],
        });

        console.log(favData);

        if (favData < 1) {
            res.status(200).json({
                message: "Anda belum punya produk favorit.",
            });
        }

        res.status(200).json(favData);
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const addFavorite = async (req, res) => {
    const { customer_id, product_id } = req.body;

    try {
        const currUser = req.user;

        if (currUser.user_id !== customer_id) {
            throw new ErrorHandler(
                "Anda tidak punya akses untuk aksi ini!",
                403
            );
        }

        const product = await Product.findByPk(product_id);

        if (!product) {
            throw new ErrorHandler("Produk tersebut tidak ada", 404);
        }

        const favorite = await Favorite.findOne({
            where: { customer_id, product_id },
        });

        if (favorite) {
            throw new ErrorHandler("Produk sudah ada di favorit", 401);
        }

        await Favorite.create({ customer_id, product_id });

        res.status(201).json({
            message: `Berhasil menambahkan ke favorite!`,
        });
    } catch (err) {
        console.error(err)
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const deleteFavorite = async (req, res) => {
    const { customer_id, product_id } = req.body;
    console.log(customer_id, product_id);

    try {
        const currUser = req.user;

        if (currUser.user_id !== customer_id) {
            throw new ErrorHandler(
                "Anda tidak punya akses untuk aksi ini!",
                403
            );
        }

        const favorite = await Favorite.findOne({
            where: { product_id },
        });

        if (!favorite) {
            throw new ErrorHandler(
                "Produk tersebut tidak ada di daftar favorit",
                404
            );
        }

        await favorite.destroy();

        res.status(200).json({ message: "Berhasil menghapus favorite!" });
    } catch (err) {
        console.error(err, err.stack);
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite,
};
