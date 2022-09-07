const {DaoProduct} = require ("../src/daoToExport");
const products = new DaoProduct();

const getProduct = async (id) => {
  try{
    if (id){
      const prodFound = await products.getById(id)
        prodFound ? res.send(prodFound) : (function(){throw new Error("No existe producto con ese ID")}()) 
    } else {
        res.send (await products.getAll())
    }
  } catch (err){
    if(err) logger.error(`Error: ${err}`)
  }
}

module.exports = {get}