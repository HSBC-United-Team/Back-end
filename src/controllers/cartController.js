const { Cart, Product } = require("../db/models");

// GET carts
const getCarts = async (req, res) => {
    try {
        const { customer_id } = req.body;
        const cartData = await Cart.findAll({
            where: { customer_id },
            include: [{ model: Product }],
            attributes: ["customer_id"],
        });
        res.send(cartData);
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

// CREATE new product

// DELETE product

// UPDATE product

module.exports = {
    getCarts,
};
