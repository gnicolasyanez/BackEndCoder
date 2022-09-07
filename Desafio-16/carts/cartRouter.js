const express = require ("express");
const cartRouter = express.Router();

cartRouter.use(express.json());
cartRouter.use(express.urlencoded({extended:true}));

const {DaoCart} = require ("../src/daoToExport");
const logger = require("../logs/logger");

const carts = new DaoCart();

cartRouter.get("/:id/productos", async ( req, res ) => {
  try{
    const id = parseInt(req.params.id);
    const cart = await carts.getById(id);
    res.send(cart);
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }
})

cartRouter.post("/", async ( req, res ) => {
  try{
    const newCart = {
      timeStamp:Date(),
      products:[]
    }
    const newCartId = (await carts.save(newCart));
    res.send({id:newCartId})
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }
})

cartRouter.delete("/:id", async ( req, res ) => {
  try{
    const id = parseInt(req.params.id)
    await carts.deleteById(id)
    res.send("Carrito eliminado correctamente")
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }
})

cartRouter.post("/:id/productos", async ( req, res) => {
  try{
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
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }
})

cartRouter.delete("/:id/productos/:id_prod", async ( req, res) => {
  try{
    const id = parseInt(req.params.id);
    const idProd = parseInt(req.params.id_prod);
    await carts.deleteProductFromCart(id, idProd);
    res.send("Producto eliminado correctamente")
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }
}) 

module.exports = { cartRouter, carts }