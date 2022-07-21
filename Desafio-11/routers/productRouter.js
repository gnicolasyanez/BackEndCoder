const express = require ("express");
const productRouter = express.Router();

productRouter.use(express.json());
productRouter.use(express.urlencoded({extended:true}));

//import ("../src/daos").then(data => {data.DaoProduct})

//const DaoProduct = require ("../src/daos/products/DaoFileProducts");
//const DaoProduct = require ("../src/daos/products/DaoMemoryProducts");
//const DaoProduct = require ("../src/daos/products/DaoMongoDbProducts");
const DaoProduct = require ("../src/daos/products/DaoFirebaseProducts");

const products = new DaoProduct();

productRouter.get("/:id?", async (req, res) => {
  const id = parseInt(req.params.id);
  if (id){
    res.send(await products.getById(id))
  } else {
      res.send (await products.getAll())
  }
})

productRouter.post("/", ( req, res ) => {
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

})

productRouter.put('/:idNumber', ( req, res ) => {
  const idProduct = parseInt(req.params.idNumber);
  const productUpdate = req.body;
  if (productUpdate === undefined){res.status(400).send({error: "productUpdate no puede ser 'undefined'"})}
  else {
      products.modifyProduct(idProduct,productUpdate)
      .then(promise => res.send(promise));
  }
})

productRouter.delete('/:idNumber', ( req, res ) => {
  const idProduct = parseInt(req.params.idNumber);
  products.deleteById(idProduct)
  .then(() => res.send('Producto eliminado correctamente'))
})

module.exports = { productRouter }