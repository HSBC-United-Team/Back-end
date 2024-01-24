const { Favorite, Product } = require("../db/models");
const ErrorHandler = require("../middlewares/errorHandler");

const getFavorites = async (req, res) => {
    const { user_id } = req.params;

    try {
        const currUser = req.user;
        if (currUser.user_id !== Number(user_id)) {
            throw new ErrorHandler("Anda tidak dapat mengakses data ini!", 403);
        }

        const favorites = await Favorite.findAll({
            where: { customer_id: user_id },
            include: [{ model: Product }],
            attributes: ["id"],
        });

        if (favorites < 1) {
            res.status(200).json({
                message: "Anda belum punya produk favorit.",
            });
        }

        res.status(200).json(favorites);
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const addFavorite = async (req, res) => {
    const { product_id } = req.body;

    try {
        const currUser = req.user;

        const product = await Product.findByPk(product_id);

        if (!product) {
            throw new ErrorHandler("Produk tersebut tidak ada", 404);
        }

        const favorite = await Favorite.findOne({
            where: { customer_id: currUser.user_id, product_id },
        });

        if (favorite) {
            throw new ErrorHandler("Produk sudah ada di favorit", 401);
        }

        await Favorite.create({ customer_id: currUser.user_id, product_id });

        res.status(201).json({
            message: `Berhasil menambahkan ${product.name} ke favorite!`,
        });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const deleteFavorite = async (req, res) => {
    const { favorite_id } = req.params;

    try {
        const favorite = await Favorite.findOne({
            where: { id: favorite_id },
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
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite,
};
