const { Favorite, Product } = require("../db/models");
const ErrorHandler = require("../middlewares/errorHandler");

const getFavorites = async (req, res) => {
    try {
        const currUser = req.user;

        const favorites = await Favorite.findAll({
            where: { customer_id: currUser.user_id },
            include: [{ model: Product }],
            attributes: ["id"],
        });

        if (favorites.length < 1) {
            return res.status(200).json({
                message: "Anda belum punya produk favorit.",
            });
        }

        return res.status(200).json({ favorites });
    } catch (err) {
        const { status = 500, message } = err;
        return res.status(status).json({ Error: message });
    }
};

const isFavorite = async (req, res) => {
    const { product_id } = req.params;

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
            await favorite.destroy();

            res.status(200).json({
                message: `Berhasil menghapus ${product.name} dari favorite!`,
            });
        } else {
            await Favorite.create({
                customer_id: currUser.user_id,
                product_id,
            });

            res.status(201).json({
                message: `Berhasil menambahkan ${product.name} ke favorite!`,
            });
        }
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    getFavorites,
    isFavorite,
};
