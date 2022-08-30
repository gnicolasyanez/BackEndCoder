const FirebaseContainer = require("../../containers/FirebaseContainer.js");
const normalizr = require ("normalizr");
const messagesListSchema = require("../../utils/normalizrSchemas") 

class DaoFirebaseMessages extends FirebaseContainer {

  static idCounter = 0;

  constructor() {
    super("messages");
  }

  async save(item) {
    item.id = DaoFirebaseMessages.DaoFirebaseMessages.idCounter;
    const messageToAdd = this.query.doc(`${DaoFirebaseMessages.idCounter}`);
    await messageToAdd.create(item)
  }

  async getAll(){
    let allMessages = [];
    const snapshot = await this.query.get();
    snapshot.forEach( doc => {
      allMessages.push(doc.data());
      if(DaoFirebaseMessages.idCounter <= doc.data().id){
      DaoFirebaseMessages.idCounter= doc.data().id +1;
      }
    }
    )
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