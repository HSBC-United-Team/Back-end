const express = require("express");
const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    getOwnOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getAllOrders);
router.get("/own-orders", getOwnOrder);
router.get("/:order_id", getSingleOrder);
router.post("/", createOrder);
router.patch("/:id", updateOrderStatus);

module.exports = router;
