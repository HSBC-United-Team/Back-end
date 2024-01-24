const express = require("express");
const {
    getCarts,
    addToCart,
    updateCart,
    deleteCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCarts);
router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/", deleteCart);

module.exports = router;
