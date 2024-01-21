const express = require("express");
const {
    getFavorites,
    addFavorite,
    deleteFavorite,
} = require("../controllers/favController");

const router = express.Router();

router.get("/:user_id", getFavorites);
router.post("/", addFavorite);
router.delete("/:favorite_id", deleteFavorite);

module.exports = router;
