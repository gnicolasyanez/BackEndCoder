const MemoryContainer = require("../../src/containers/MemoryContainer.js");

class DaoMongoDbCarts extends MemoryContainer {
  constructor() {
    super();
  }

  async getById (id){
    return (this.arrayInMemory.find(cart => cart.id === id))
  }

  async save (item){
    console.log({...item, id: MemoryContainer.contadorId});
    this.arrayInMemory.push({...item, id: MemoryContainer.contadorId});
    MemoryContainer.contadorId ++;
    console.log("save", this.arrayInMemory);
  }

  async deleteById (id){
    this.arrayInMemory = this.arrayInMemory.filter(cart => cart.id !== id);
    console.log("deleteById", this.arrayInMemory);
  }

  async addProductToCart (id, productToAdd){
    let cartToUpdate = this.arrayInMemory.find(cart => cart.id === id);
    cartToUpdate.products.push({...productToAdd, id: MemoryContainer.contadorId})
    MemoryContainer.contadorId ++;
    const indexProduct = this.arrayInMemory.findIndex((cart) => cart.id === id);
    this.arrayInMemory.splice(indexProduct,1, cartToUpdate)
    console.log("addProductToCart", this.arrayInMemory);
  }

  async deleteProductFromCart (id, idProd){
    const indexProduct = this.arrayInMemory.findIndex((cart) => cart.id === id);
    let cartToUpdate = this.arrayInMemory.find(cart => cart.id === id);
    const productList = cartToUpdate.products.filter(prod => prod.id !== idProd);
    cartToUpdate.products = productList
    this.arrayInMemory.splice(indexProduct,1, cartToUpdate)
    console.log("deleteProductFromCart", this.arrayInMemory);
  }


}

module.exports = DaoMongoDbCarts;