const DaoFileCarts = require("./DaoFileCarts");
const DaoMemoryCarts = require("./DaoMemoryCarts");
const DaoMongoDbCarts = require("./DaoMongoDbCarts");
const DaoFirebaseCarts = require("./DaoFirebaseCarts");


class CartDaoFactory{
  create(type) {
    switch(type){
      case "fs": return new DaoFileCarts();
      case "memory": return new DaoMemoryCarts();
      case "mongoDb": return new DaoMongoDbCarts();
      case "firebase": return new DaoFirebaseCarts();
    }
  }
}

module.exports = {CartDaoFactory}