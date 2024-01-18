const express = require("express");
const {
    getFavorites,
    addFavorite,
    deleteFavorite,
} = require("../controllers/favController");

const router = express.Router();

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/", deleteFavorite);

module.exports = router;
