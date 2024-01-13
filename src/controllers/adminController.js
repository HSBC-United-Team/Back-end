const { Product } = require("../db/models");

// GET products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.send({ products });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

// CREATE new product

// DELETE product

// UPDATE product

module.exports = {
    getProducts,
};
