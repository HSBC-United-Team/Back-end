// Contoh:
// const express = require("express");
// const {
//   getAllPosts,
//   getPost,
//   createPost,
//   updatePost,
//   deletePost,
// } = require("../controllers/posts.controller");
// const authentication = require("../middlewares/authorization");

// const router = express.Router();

// router.get("/", getAllPosts);
// router.post("/", authentication, createPost);
// router.get("/:id", authentication, getPost);
// router.put("/:id", authentication, updatePost);
// router.delete("/:id", authentication, deletePost);

// module.exports = router;

// //////////////////////////////////////////////////////////////////
// Customer can:
// A. Cart: Add, remove, decrease, increase products in cart
// B. Fav: Add, remove, decrease, increase products in favorite
// C. Order: Add, remove, decrease, increase products in cart

const express = require("express");
const { getProducts } = require("../controllers/adminRoute");

const router = express.Router();

router.get("/", getProducts);

module.exports = router;
