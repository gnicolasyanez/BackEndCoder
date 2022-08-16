const mongoose = require ("mongoose");

class MongoDbContainer {
  static idCounter = 1;

  constructor(collection, prodSchema) {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Conectado a DB de mongo");
    this.collection = mongoose.model(collection, prodSchema);
  }
}

module.exports = MongoDbContainer;