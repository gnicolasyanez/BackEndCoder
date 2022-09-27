const mongoose = require ("mongoose");
const MongoDbContainer = require ("../../src/containers/MongoDbContainer.js");
const norm = require ("normalizr");

const messageSchema = new mongoose.Schema({
  author: {type: Object},
  text: {type: String},
  timeStamp: {type:String}
})

class DaoMongoDbMessages extends MongoDbContainer {

  constructor() {
    super("messages", messageSchema);
  }

  async save(item) {
    let newMessage = new this.collection(item);
    await newMessage.save();
    return ("Mensaje enviado correctamente")
  }

  async getAll(){
    return await this.collection.find();
  }

  async normalize(){
    const messages = await this.collection.find();
    const messagesToNormalize = {
      id:1,
      messages:messages
    }
    console.log(messagesToNormalize);
  }

}

module.exports = DaoMongoDbMessages;