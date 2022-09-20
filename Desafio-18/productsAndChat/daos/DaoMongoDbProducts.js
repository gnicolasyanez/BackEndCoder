const mongoose = require("mongoose");
const MongoDbContainer = require ("../../src/containers/MongoDbContainer.js");

const prodSchema = new mongoose.Schema({
  id: {type: Number, require:true, unique:true},
  title: {type:String},
  description: {type:String},
  price: {type:Number},
  stock: {type:Number},
  thumbnail: {type:String},
  timeStamp: {type:Date},
  code:{type:String}
})

let instance = null;

class DaoMongoDbProducts extends MongoDbContainer {

  constructor() {
    super("products", prodSchema);
  }

  async save(item){
    item.id = MongoDbContainer.idCounter;
    const productToAdd = new this.collection(item);
    await productToAdd.save()
    MongoDbContainer.idCounter ++
    return(`Producto Agregado Correctamente`)
  }

  async getById(idNumber){   
      return await this.collection.find({id:idNumber})
  }

  async getAll(){
    return await this.collection.find();
  }

  async modifyProduct(idNumber,productUpdate) {
    await this.collection.updateOne({id:idNumber},{$set:{...productUpdate}})
    return ("Producto Actualizado Correctamente")
  }

  async deleteById(idNumber){
    await this.collection.deleteOne({id:idNumber})
  }

  async deleteAll(){
    await this.collection.deleteMany()
  }

  getInstance(){
    if (!instance) instance = new DaoMongoDbProducts()
    return instance
}

}

module.exports = DaoMongoDbProducts;