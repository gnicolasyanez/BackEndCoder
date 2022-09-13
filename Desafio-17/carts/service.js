const { CartDaoFactory } = require("./daos/CartDaoFactory")
const { Cart } = require ("./cart")
const logger = require("../logs/logger")

const daoFactory = new CartDaoFactory()

class CartService {
  constructor(type) {
    this.carts = daoFactory.create(type)
  }

  async getById(id){
    try{
      return await this.carts.getById(id);
    } catch (err){
      if(err) logger.error(`Error: ${err}`)
    }
  }
  async save(newCart){
    try{
      const newCartInstance = new Cart(newCart)
      return (await this.carts.save(newCartInstance));
    } catch (err){
      if(err) logger.error(`Error: ${err}`)
    }
  }
  async deleteById(id){
    try{
      await this.carts.deleteById(id)
    } catch (err){
      if(err) logger.error(`Error: ${err}`)
    }
  }
  async addProductToCart(id, productToAdd){
    try{
      await await this.carts.addProductToCart( id, productToAdd)
    } catch (err){
      if(err) logger.error(`Error: ${err}`)
    }
  }
  async deleteProductFromCart( idCart, idProduct ){
    try{
      await this.carts.deleteProductFromCart(idCart, idProduct);
    } catch (err){
      if(err) logger.error(`Error: ${err}`)
    }
  }

}

module.exports = CartService