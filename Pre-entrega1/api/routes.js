const express = require("express");
const { Router } = express;

const { verifyTokenAndAdmin } = require("./middlewares/verifyToken");

// Products Controllers
const getAll = require("./controllers/products/getAll");
const getById = require("./controllers/products/getById");
const save = require("./controllers/products/saveProduct");
const update = require("./controllers/products/updateProduct");
const deleteById = require("./controllers/products/deleteById");

// Auth Controllers
const CreateNewUser = require("./controllers/auth/register");
const LoginUser = require("./controllers/auth/login");

//Cart Controllers
const createNewCart = require("./controllers/cart/createCart");
const deleteCartById = require("./controllers/cart/deleteCart");
const getCartProducts = require("./controllers/cart/getCartProducts");
const deleteProductFromCart = require("./controllers/cart/deleteProductFromCart");
const addProductsToCart = require("./controllers/cart/addProductsToCart");

const router = new Router();

//Auth Routes
router.post("/register", CreateNewUser);
router.post("/login", LoginUser);

// Products Routes
router.get("/products", getAll);
router.get("/products/:id", getById);
router.post("/products", verifyTokenAndAdmin, save);
router.put("/products/:id", verifyTokenAndAdmin, update);
router.delete("/products/:id", verifyTokenAndAdmin, deleteById);

// Cart Routes
router.post("/cart", createNewCart);
router.delete("/cart/:cartId", verifyTokenAndAdmin, deleteCartById);
router.get("/cart/:cartId/products", getCartProducts);
router.post("/cart/:cartId/products", verifyTokenAndAdmin, addProductsToCart);
router.delete(
  "/cart/:cartId/products/:productId",
  verifyTokenAndAdmin,
  deleteProductFromCart
);

module.exports = router;