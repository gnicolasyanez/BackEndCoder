const express = require("express");
const { Router } = express;

// Products Controllers
const getAll = require("./controllers/products/getAll");
const getById = require("./controllers/products/getById");
const save = require("./controllers/products/saveProduct");
const update = require("./controllers/products/updateProduct");
const deleteById = require("./controllers/products/deleteById");

const router = new Router();

// Products Routes
router.get("/products", getAll);
router.get("/products/:id", getById);
router.post("/products", save);
router.put("/products/:id", update);
router.delete("/products/:id", deleteById);

module.exports = router;