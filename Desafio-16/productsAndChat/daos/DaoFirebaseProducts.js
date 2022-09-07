const FirebaseContainer = require("../../src/containers/FirebaseContainer.js");

class DaoFirebaseProducts extends FirebaseContainer {
  static idCounter = 0
  constructor() {
    super("products")
  }

  async save(item){
    const allProducts = await this.query.get();
    allProducts.forEach((product) => {
      if(DaoFirebaseProducts.idCounter <= product.data().id){
        DaoFirebaseProducts.idCounter = product.data().id +1;
      }
    })
    item.id = DaoFirebaseProducts.idCounter;
    const productToAdd = this.query.doc(`${DaoFirebaseProducts.idCounter}`);
    await productToAdd.create(item)

    return `Producto Agregado Correctamente, id: ${item.id}`
  }

  async getById(idNumber){   
    const productFound = await (await this.query.doc(`${idNumber}`).get()).data();
    return productFound
  }

  async getAll(){
    const products = await this.query.get();
    return products.docs.map(doc=> doc.data());
  }

  async modifyProduct(idNumber,productUpdate) {
    const productFound = await this.query.doc(`${idNumber}`)
    await productFound.update({...productUpdate})
    return ("Producto Modificado Correctamente")
  }

  async deleteById(idNumber){
    const productFound = await this.query.doc(`${idNumber}`)
    await productFound.delete()
  }

  async deleteAll(){
    
  }

}

module.exports = DaoFirebaseProducts;