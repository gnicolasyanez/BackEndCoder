const {ProductDaoFactory} = require ("../daos/ProductDaoFactory");
const {Product} = require("../product")
const logger = require("../../logs/logger")

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
          return undefined
        }
      }
    catch (err){
      logger.error(`Error: ${err}`)
    }
  }

  async postProduct (productToAdd) {
    try{
      for (let property in productToAdd){
        if(!productToAdd[property]) return undefined;
      }
      productToAdd.timeStamp = new Date();
      const newProduct = new Product(productToAdd)
      return (await this.products.save(newProduct))
    } catch (err){
      logger.error(`Error: ${err}`)
    }
}

async putProduct (id, productUpdate) {
  try{
    const response = await this.products.modifyProduct(id,productUpdate)
    return response
  } catch (err){
    logger.error(`Error: ${err}`)
  }
}

async deleteProduct (id) {
  try{
    const product = await this.products.getById(id)
    if (!product) return undefined
    const response = await this.products.deleteById(id)
    return(response)
  } catch {
    logger.error(`Error: ${err}`)
  }
}

}

module.exports = ProductService