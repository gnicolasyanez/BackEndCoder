const express = require ("express");
const productRouter = express.Router();

productRouter.use(express.json());
productRouter.use(express.urlencoded({extended:true}));

const ProductService = require("./service")
const service = new ProductService(process.env.DATA_BASE_PRODUCTS)

productRouter.get("/:id?", async (req, res) => {
  const id = parseInt(req.params.id);
  if (id){
    const prodFound = await service.getProduct(id)
    if (prodFound == undefined) res.status(404).send("No existe producto con ese id")
    res.send(prodFound)
  }else {
    if (req.params.id) res.status(400).send("El ID debe ser un numero")
    const allProducts = await service.getAllProducts()
    res.send(allProducts)
  }
})

productRouter.post("/", async ( req, res ) => {
  const productToAdd = {
    title:req.body.title,
    description:req.body.description,
    code:req.body.code,
    price:parseInt(req.body.price),
    thumbnail:req.body.thumbnail,
    stock:req.body.stock
  }
  const response = await service.postProduct(productToAdd)
  if (!response) {res.status(400).send("Faltan propiedades al producto")}
  res.send(response)
  

})

productRouter.put('/:idNumber', async ( req, res ) => {
    const idProduct = parseInt(req.params.idNumber);
    const productUpdate = req.body;
    if (!Object.keys(productUpdate).length)res.status(400).send("Product to update no puede ser 'undefined'")
    else {
      const response = await service.putProduct(idProduct, productUpdate)
      res.send(response)
    }
})

productRouter.delete('/:idNumber', async ( req, res ) => {
    const idProduct = parseInt(req.params.idNumber);
    const response = await service.deleteProduct(idProduct)
    if (!response) res.status(400).send("No existe producto con ese id")
    res.send(response)
})

module.exports = { productRouter }