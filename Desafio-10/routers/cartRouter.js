const express = require ("express");
const cartRouter = express.Router();

cartRouter.use(express.json());
cartRouter.use(express.urlencoded({extended:true}));

//import { DaoCart } from "../src/daos";

//const DaoCart = require("../src/daos/carts/DaoFileCarts");
const DaoCart = require("../src/daos/carts/DaoFirebaseCarts");
//const DaoCart = require("../src/daos/carts/DaoMemoryCarts");
//const DaoCart = require("../src/daos/carts/DaoMongoDbCarts");

const carts = new DaoCart();

cartRouter.get("/:id/productos", async ( req, res ) => {
  const id = parseInt(req.params.id);
  const cart = await carts.getById(id);
  res.send(cart.products);
})

cartRouter.post("/", async ( req, res ) => {
  const newCart = {
    timeStamp:Date(),
    products:[]
  }
  await carts.save(newCart);
  res.send("Carrito creado correctamente")
})

cartRouter.delete("/:id", async ( req, res ) => {
  const id = parseInt(req.params.id)
  await carts.deleteById(id)
  res.send("Carrito eliminado correctamente")
})

cartRouter.post("/:id/productos", async ( req, res) => {
  const id = parseInt(req.params.id);
  const productToAdd = {
    title:req.body.title,
    description:req.body.description,
    code:req.body.code,
    price:parseInt(req.body.price),
    thumbnail:req.body.thumbnail,
    stock:req.body.stock,
    timeStamp: req.body.timeStamp
  }
  await carts.addProductToCart( id, productToAdd)
  res.send("Producto agregado al carrito")
})

cartRouter.delete("/:id/productos/:id_prod", async ( req, res) => {
  const id = parseInt(req.params.id);
  const idProd = parseInt(req.params.id_prod);
  await carts.deleteProductFromCart(id, idProd);
  res.send("Producto eliminado correctamente")
}) 

module.exports = { cartRouter }