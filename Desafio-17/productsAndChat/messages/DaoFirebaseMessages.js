const FirebaseContainer = require("../../src/containers/FirebaseContainer.js");
const normalizr = require ("normalizr");
const messagesListSchema = require("../normalizrSchemas") 

class DaoFirebaseMessages {

  static idCounter = 0;

  constructor() {
    this.firebaseClient = new FirebaseContainer("messages")
  }

  async save(message) {
    message.id = DaoFirebaseMessages.idCounter;
    return await this.firebaseClient.save(message.id, message)
  }

  async getAll(){
    const allMessages = await this.firebaseClient.getAll()
    allMessages.forEach( message => {
      if (DaoFirebaseMessages.idCounter <= message.id){ DaoFirebaseMessages.idCounter = message.id +1} 
    })
    return allMessages;
  }

  async normalize(){
    const messages = await this.getAll();
    const messagesToNormalize = {
      id:1,
      messages:messages
    }
    const normalized = normalizr.normalize(messagesToNormalize, messagesListSchema)
    return normalized
  }
}


  module.exports = DaoFirebaseMessages;