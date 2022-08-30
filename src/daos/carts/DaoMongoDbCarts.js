const mongoose = require("mongoose");
const MongoDbContainer = require ("../../containers/MongoDbContainer.js");

const prodSchema = new mongoose.Schema({
  id: {type: Number, require:true, unique:true},
  products: {type: Array},
  timeStamp: {type:Date},
})

class DaoMongoDbCarts extends MongoDbContainer {
  
  constructor() {
    super("carts",prodSchema);
  }

  async getById (id){
    return await this.collection.find({id:id});
  }

  async save (item){
    item.id = MongoDbContainer.idCounter;
    const cartToAdd = new this.collection(item);
    await cartToAdd.save();
    MongoDbContainer.idCounter ++;
    return(`Producto Agregado Correctamente`);
  }

  async deleteById (id){
    await this.collection.deleteOne({id:id});
  }

  async addProductToCart (id, productToAdd){
    const cartToUpdate = await this.collection.find({id:id});
    cartToUpdate[0].products.push({...productToAdd, id:MongoDbContainer.idCounter});
    MongoDbContainer.idCounter ++ ;
    await this.collection.updateOne({id:id},{$set:{...cartToUpdate[0]}})
  }

  async deleteProductFromCart (id, idProd){
    const cartToUpdate = await this.collection.find({id:id});
    const productList = cartToUpdate[0].products.filter(prod => prod.id !== idProd)
    await this.collection.updateOne({id:id},{$set:{products: productList}})
  }


}

module.exports = DaoMongoDbCarts;