const { Cart } = require("../db/models");

// GET carts
const getCarts = async (req, res) => {
    try {
        const {customer_id} = req.body;
        const cart_id = await Cart.findOne({where: {customer_id:customer_id}});
        const cart_items = await Cart_item.findOne({where: {customer_id: cart_id.customer_id}});
        res.send({ cart_items });
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
