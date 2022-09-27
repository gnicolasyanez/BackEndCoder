const express = require ("express");
const cartRouter = express.Router();

cartRouter.use(express.json());
cartRouter.use(express.urlencoded({extended:true}));

const CartService = require("./service")
const service = new CartService(process.env.DATA_BASE_CARTS)


cartRouter.get("/:id/productos", async ( req, res ) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Should throw an error 'El ID debe ser un numero")
  } else{
    const cart = await service.getById(id)
    if (Object.entries(cart).length === 0) {
      res.status(404).send("No existe carrito con ese id")
    } else {
      res.send(cart)
    }
    
  }
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
  const response = await service.addProductToCart(id, productToAdd)
  if (!response) { res.status(400).send("El producto no puede ser undefined")}
  else {res.send(response)}
})

cartRouter.delete("/:id", async ( req, res ) => {
  const id = parseInt(req.params.id)
  await service.deleteById(id)
  res.send("Carrito eliminado correctamente")
})

cartRouter.delete("/:id/productos/:id_prod", async ( req, res) => {
  const id = parseInt(req.params.id);
  const idProd = parseInt(req.params.id_prod);
  await service.deleteProductFromCart( id, idProd )
  res.send("Producto eliminado correctamente del carrito")
}) 

module.exports = { cartRouter, service }