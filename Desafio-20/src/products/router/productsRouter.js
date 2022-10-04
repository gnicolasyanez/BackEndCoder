const router = require("koa-router");
const ProductService = require("../service/ProductService")

const service = new ProductService(process.env.DATA_BASE_PRODUCTS)

const productsRouter = router({ prefix: "/productos" });

productsRouter.get("/", async (ctx) => {
  const products = await service.getAllProducts()
  ctx.body = products
})

productsRouter.get("/:id", async (ctx) => {
  const id = parseInt(ctx.request.params.id)
  if (isNaN(id)){
    ctx.status = 400 
    ctx.body = {error: "El ID debe ser un numero"}
  } else {
    const prodFound = await service.getProduct(id)
    if (prodFound == undefined){
      ctx.status = 404
      ctx.body = {error: "No existe producto con ese id"}
    } else {
      ctx.body = prodFound
    }
  }
})

productsRouter.post("/", async (ctx) => {
  const { title, description, code, price, thumbnail, stock} = ctx.request.body;
  const product ={ title, description, code, price, thumbnail, stock}
  const response = await service.postProduct(product)
  if (!response) {
    ctx.status = 400
    ctx.body = {error: "Faltan propiedades al producto"}
  }
  ctx.body = response
})

productsRouter.put('/:id', async ( ctx ) => {
  const idProduct = parseInt(ctx.request.params.id)
  const productUpdate = ctx.request.body;
  if (!Object.keys(productUpdate).length){
    ctx.status = 400 
    ctx.body = {error : "Product to update no puede ser 'undefined'"}
  } 
  else {
    const response = await service.putProduct(idProduct, productUpdate)
    ctx.body = response
  }
})

productsRouter.delete('/:id', async ( ctx ) => {
  const idProduct = parseInt(ctx.request.params.id)
  const response = await service.deleteProduct(idProduct)
  if (!response){
    ctx.status = 400 
    ctx.body = {error : "No existe producto con ese id"}
  } else {
    ctx.body = response
  }
})

module.exports = productsRouter

