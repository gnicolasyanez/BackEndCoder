const FirebaseContainer = require("../../src/containers/FirebaseContainer.js");

class DaoFirebaseCarts {
  static idCounter = 0
  constructor() {
    this.firebaseClient = new FirebaseContainer ("carts")
  }

  async getById (id){
    return  await this.firebaseClient.getById(id)
  }

  async save (item){
    const allCarts = await this.firebaseClient.getAll();
    allCarts.forEach((cart) => {
      if(DaoFirebaseCarts.idCounter <= cart.id){
        DaoFirebaseCarts.idCounter = cart.id +1;
      }
    })
    item.id = DaoFirebaseCarts.idCounter
    const itemDto = item.toDto()

    return await this.firebaseClient.save(itemDto.id, itemDto);
  }

  async deleteById (id){
    return await this.firebaseClient.deleteById(id)
  }

  async addProductToCart (id, productToAdd){
    const data = await this.firebaseClient.getById(id);
    const newProductsList = [...data.products, productToAdd]
    return await this.firebaseClient.updateDoc(id,{products: newProductsList})
  }

  async deleteProductFromCart (id, idProd){
    const data = await this.firebaseClient.getById(id);
    const newProductsList = data.products.filter(prod => prod.id !== idProd)
    return await this.firebaseClient.updateDoc(id,{products: newProductsList})
  }

}

module.exports = DaoFirebaseCarts;

