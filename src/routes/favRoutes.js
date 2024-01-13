const express = require("express");
const {
    getFavorites,
    createFavorite,
    deleteFavorite,
} = require("../controllers/fav.controller");

const router = express.Router();

router.get("/", getFavorites);
router.post("/", createFavorite);
router.delete("/", deleteFavorite);

module.exports = router;
