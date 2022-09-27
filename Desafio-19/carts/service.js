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
      const carrito = await this.carts.getById(id);
      if (carrito) return carrito.products
      return {}
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  }

  async save(newCart){
    try{
      const newCartInstance = new Cart(newCart)
      const cart = (await this.carts.save(newCartInstance));
      return cart.id
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  }

  async deleteById(id){
    try{
      await this.carts.deleteById(id)
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  }

  async addProductToCart(id, productToAdd){
    try{
      if (!productToAdd) return undefined
      return await this.carts.addProductToCart( id, productToAdd)
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  }
  
  async deleteProductFromCart( idCart, idProduct ){
    try{
      await this.carts.deleteProductFromCart(idCart, idProduct);
    } catch (err){
      logger.error(`Error: ${err}`)
    }
  }

}

module.exports = CartService