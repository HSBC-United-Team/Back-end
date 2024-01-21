const express = require("express");
const {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const auth = require("../middlewares/authentication");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:product_id", getProduct);
router.post("/", auth, addProduct);
router.put("/:product_id", auth, updateProduct);
router.delete("/:product_id", auth, deleteProduct);

module.exports = router;
