const FirebaseContainer = require("../../src/containers/FirebaseContainer.js");

class DaoFirebaseCarts extends FirebaseContainer {
  static idCounter = 0
  constructor() {
    super("carts");
  }

  async getById (id){
    const cartFound = await (await this.query.doc(`${id}`).get()).data();
    return cartFound;
  }

  async save (item){
    const allCarts = await this.query.get();
    allCarts.forEach((cart) => {
      if(DaoFirebaseCarts.idCounter <= cart.data().id){
        DaoFirebaseCarts.idCounter = cart.data().id +1;
      }
    })
    item.id = DaoFirebaseCarts.idCounter
    const cartToAdd = this.query.doc(`${DaoFirebaseCarts.idCounter}`);
    await cartToAdd.create(item)
    return item.id
  }

  async deleteById (id){
    const cartFound = await this.query.doc(`${id}`)
    await cartFound.delete()
  }

  async addProductToCart (id, productToAdd){
    const data = await (await this.query.doc(`${id}`).get()).data();
    const cartToUpdate = await this.query.doc(`${id}`);
    productToAdd.id = 3;
    const newProductsList = [...data.products, productToAdd]
    await cartToUpdate.update({products: newProductsList})
  }

  async deleteProductFromCart (id, idProd){
    const data = await (await this.query.doc(`${id}`).get()).data();
    const cartToUpdate = await this.query.doc(`${id}`);
    const newProductsList = data.products.filter(prod => prod.id !== idProd)
    await cartToUpdate.update({products: newProductsList})
  }

}

module.exports = DaoFirebaseCarts;

