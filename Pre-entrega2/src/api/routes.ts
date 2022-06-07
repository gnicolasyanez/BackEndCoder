const express = require("express");
const { Router } = express;

// Products Controller
const getAll = require("./controllers/products/getAll");
const getById = require("./controllers/products/getById");
const save = require("./controllers/products/saveProduct");
const updateProduct = require("./controllers/products/updateProduct");
const deleteById = require("./controllers/products/deleteById");

// Cart Controllers
const createNewCart = require("./controllers/cart/createCart");
const deleteCart = require("./controllers/cart/deleteCart");
const addProductsToCart = require("./controllers/cart/addProductsToCart");
const deleteProductsFromCart = require("./controllers/cart/deleteProductsFromCart");
const getProductsFromCart = require("./controllers/cart/getProductsFromCart");

const router = new Router();

// // Products Routes
router.get("/products", getAll);
router.get("/products/:id", getById);
router.post("/products", save);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteById);

// Cart Routes
router.post("/cart", createNewCart);
router.delete("/cart/:id", deleteCart);
router.put("/cart/:id/products", addProductsToCart);
router.delete("/cart/:id/products", deleteProductsFromCart);
router.get("/cart/:id/products", getProductsFromCart);

module.exports = router;