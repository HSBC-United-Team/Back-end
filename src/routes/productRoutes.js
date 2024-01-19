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
router.get("/:id", getProduct);
router.post("/", auth, addProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
