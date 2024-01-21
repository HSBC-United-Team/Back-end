const express = require("express");
const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getSingleOrder);
router.post("/", createOrder);
router.patch("/:id", updateOrderStatus);

module.exports = router;
