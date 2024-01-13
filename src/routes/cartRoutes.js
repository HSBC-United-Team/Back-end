const express = require("express");
const { getCarts } = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCarts);

module.exports = router;
