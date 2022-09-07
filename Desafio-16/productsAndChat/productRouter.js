const express = require ("express");
const productRouter = express.Router();

productRouter.use(express.json());
productRouter.use(express.urlencoded({extended:true}));

//import ("../src/daos/index").then(data => {data.DaoProduct})

const {DaoProduct} = require ("../src/daoToExport");
const logger = require("../logs/logger");
const products = new DaoProduct();
const {getProduct} = require("./service")

productRouter.get("/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  getProduct(id)
  
})

productRouter.post("/", ( req, res ) => {
  try{
    const productToAdd = {
      title:req.body.title,
      description:req.body.description,
      code:req.body.code,
      price:parseInt(req.body.price),
      thumbnail:req.body.thumbnail,
      stock:req.body.stock
    }
    if (productToAdd === undefined){res.status(400).send({error: "product no puede ser 'undefined'"})}
      else{
          products.save(productToAdd)
          .then((productAdded) => {
              res.json({
                  productAdded:productAdded,
                  id:productAdded.id
              })
          })
      }
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }

})

productRouter.put('/:idNumber', ( req, res ) => {
  try{
    const idProduct = parseInt(req.params.idNumber);
    const productUpdate = req.body;
    if (productUpdate === undefined){res.status(400).send({error: "productUpdate no puede ser 'undefined'"})}
    else {
        products.modifyProduct(idProduct,productUpdate)
        .then(promise => res.send(promise));
    }
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }

})

productRouter.delete('/:idNumber', ( req, res ) => {
  try{
    const idProduct = parseInt(req.params.idNumber);
    products.deleteById(idProduct)
    .then(() => res.send('Producto eliminado correctamente'))
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }
})

module.exports = { productRouter }