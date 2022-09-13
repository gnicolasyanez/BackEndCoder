const express = require ("express");
const cartRouter = express.Router();

cartRouter.use(express.json());
cartRouter.use(express.urlencoded({extended:true}));

const CartService = require("./service")
const service = new CartService(process.env.DATA_BASE_CARTS)


cartRouter.get("/:id/productos", async ( req, res ) => {
  const id = parseInt(req.params.id);
  const cart = await service.getById(id)
  res.send(cart);
})

cartRouter.post("/", async ( req, res ) => {
  const newCart = {
    timeStamp:Date(),
    products:[]
  }
  const idNewCart = await service.save(newCart)
  res.send({id:idNewCart})
})

cartRouter.delete("/:id", async ( req, res ) => {
  const id = parseInt(req.params.id)
  service.deleteById(id)
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
  await service.addProductToCart(id, productToAdd)
  res.send("Producto agregado al carrito")
})

cartRouter.delete("/:id/productos/:id_prod", async ( req, res) => {
  const id = parseInt(req.params.id);
  const idProd = parseInt(req.params.id_prod);
  await service.deleteProductFromCart( id, idProd )
  res.send("Producto eliminado correctamente")
}) 

module.exports = { cartRouter, service }