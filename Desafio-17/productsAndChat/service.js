const {ProductDaoFactory} = require ("./daos/ProductDaoFactory");
const {Product} = require("./product")
const logger = require("../logs/logger")

const daoFactory = ProductDaoFactory.getInstance()

class ProductService {
  constructor (type) {
    this.products = daoFactory.create(type)
  }

  async getAllProducts() {
    try{
      return (await this.products.getAll())
    }catch(err){
      logger.error(`Error: ${err}`)
    }
  }

  async getProduct(id) {
    try{
        const prodFound = await this.products.getById(id)
        if (prodFound) {
          return prodFound
        } else {
          return function(){throw new Error("No existe producto con ese ID")}
        }
      }
    catch (err){
      logger.error(`Error: ${err}`)
    }
  }

  async postProduct (productToAdd) {
    try{
      productToAdd.timeStamp = new Date();
      const newProduct = new Product(productToAdd)
      return (await this.products.save(newProduct))
    } catch (err){
      logger.error(`Error: ${err}`)
    }
}

putProduct (id, productUpdate) {
  try{
    this.products.modifyProduct(id,productUpdate)
      .then(promise => {return promise});
  } catch (err){
    logger.error(`Error: ${err}`)
  }
}

async deleteProduct (id) {
  try{
    this.products.deleteById(id)
    .then(() => {return('Producto eliminado correctamente')})
  } catch {
    logger.error(`Error: ${err}`)
  }
}

}

module.exports = ProductService