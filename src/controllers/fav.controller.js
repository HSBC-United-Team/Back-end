const { Favorite, Product, Favorite_item, User } = require("../db/models");

const getFavorites = async (req, res) => {
    const { customer_id } = req.body;

    try {
        const cartData = await Favorite.findAll({
            where: { customer_id },
            include: [
                { model: Product, attributes: ["id", "name", "img_url"] },
            ],
            attributes: ["customer_id"],
        });

        if (!cartData) {
            throw new ErrorHandler("Anda belum punya produk favorit", 404);
        }

        res.json(cartData);
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const createFavorite = async (req, res) => {
    const { customer_id, product_id } = req.body;

    try {
        const user = await User.findByPk(customer_id);
        const product = await Product.findByPk(product_id);

        if (!user || !product) {
            throw new ErrorHandler("User atau produk tidak ditemukan", 404);
        }

        const favorite = await Favorite.create({ customer_id });
        console.log(Favorite_item);
        await Favorite_item.create({
            favorite_id: favorite.id,
            product_id,
        });

        res.status(201).json({
            message: "Berhasil menambahkan produk ke favorite!",
            favorite,
        });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const deleteFavorite = async (req, res) => {
    const { customer_id, product_id } = req.body;

    try {
        const user = await User.findByPk(customer_id);
        const product = await Product.findByPk(product_id);

        if (!user || !product) {
            throw new ErrorHandler("User atau produk tidak ditemukan", 404);
        }

        const favorite = await Favorite.findOne({
            where: { customer_id },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: [],
                        where: { product_id },
                    },
                },
            ],
        });

        if (!favorite) {
            throw new ErrorHandler("Favorite tidak ditemukan", 404);
        }

        // Delete the favorite item
        await Favorite_item.destroy({
            where: {
                favorite_id: favorite.id,
                product_id,
            },
        });

        if (favorite.Products.length === 0) {
            await Favorite.destroy({
                where: { id: favorite.id },
            });
        }

        res.status(200).json({ message: "Berhasil menghapus favorite!" });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    getFavorites,
    createFavorite,
    deleteFavorite,
};
