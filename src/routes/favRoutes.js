const express = require("express");
const { getFavorites, isFavorite } = require("../controllers/favController");

const router = express.Router();

router.get("/", getFavorites);
router.post("/:product_id", isFavorite);

module.exports = router;
