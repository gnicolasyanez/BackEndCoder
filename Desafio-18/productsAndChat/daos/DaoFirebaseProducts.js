const FirebaseContainer = require("../../src/containers/FirebaseContainer.js");

let instance = null;

class DaoFirebaseProducts {
  static idCounter = 0
  constructor() {
    this.firebaseClient = new FirebaseContainer("products")
  }

  async save(product){
    const allProducts = await this.firebaseClient.getAll()
    allProducts.forEach((product) => {
      if(DaoFirebaseProducts.idCounter <= product.id){
        DaoFirebaseProducts.idCounter = product.id +1;
      }
    })
    product.id = DaoFirebaseProducts.idCounter;
    const productToAdd = product.toDto()

    return await this.firebaseClient.save(productToAdd.id, productToAdd)
  }

  async getById(id){   
    return this.firebaseClient.getById(id)
  }

  async getAll(){
    return await this.firebaseClient.getAll()
  }

  async modifyProduct(id,productUpdate) {
    return await this.firebaseClient.updateDoc(id,productUpdate)
  }

  async deleteById(id){
    return await this.firebaseClient.deleteById(id)
  }

  async deleteAll(){
    
  }

  static getInstance(){
    if (!instance) instance = new DaoFirebaseProducts()
    return instance
}

}

module.exports = DaoFirebaseProducts;