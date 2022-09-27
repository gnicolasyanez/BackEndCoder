const DaoFileProducts = require ("./DaoFileProducts");
const DaoMemoryProducts = require ("./DaoMemoryProducts");
const DaoMongoDbProducts = require ("./DaoMongoDbProducts");
const DaoFirebaseProducts = require ("./DaoFirebaseProducts");

let instance = null;

class ProductDaoFactory{
static getInstance() {
  if (!instance) instance = new ProductDaoFactory()
  return instance
}

  create(type) {
  
    switch(type){
      case "fs": return DaoFileProducts.getInstance();
      case "memory": return DaoMemoryProducts.getInstance();
      case "mongoDb": return DaoMongoDbProducts.getInstance();
      case "firebase": return DaoFirebaseProducts.getInstance();
    }
  }
}

module.exports = {ProductDaoFactory}