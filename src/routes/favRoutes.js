const express = require("express");
const {
  getFavorites,
  createFavorite,
} = require("../controllers/fav.controller");

const router = express.Router();

router.get("/", getFavorites);
router.post("/", createFavorite);

module.exports = router;
