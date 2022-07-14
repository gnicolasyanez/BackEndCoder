const mongoose = require ("mongoose");

class MongoDbContainer {
  static idCounter = 1;

  constructor(collection, prodSchema) {
    mongoose.connect(`mongodb://localhost:27017/ecommerce`);
    console.log("Conectado a DB de mongo");
    this.collection = mongoose.model(collection, prodSchema);
  }
}

module.exports = MongoDbContainer;