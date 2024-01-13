const express = require("express");
const { getCart } = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", getCart);

module.exports = router;
