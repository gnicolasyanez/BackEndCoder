const admin = require("firebase-admin");

const firebaseData = process.env.FIREBASE_DATA
const serviceAccount = JSON.parse(firebaseData);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

class FirebaseContainer {
  constructor(db) {
    this.db = admin.firestore();
    this.query = this.db.collection(db)
  }

  async save (id, item) {
    const itemToAdd = this.query.doc(`${id}`);
    await itemToAdd.create(item)

    return `Agregado Correctamente, id: ${item.id}`
  }

  async getAll() {
    const products = await this.query.get();
    return products.docs.map(doc=> doc.data());
  }

  async getById (id) {
    const docFound = await (await this.query.doc(`${id}`).get()).data();
    return docFound
  }

  async updateDoc (id, updatedDoc){
    const currentDoc = await this.query.doc(`${id}`);
    await currentDoc.update({...updatedDoc})
    return ("Producto Modificado Correctamente")
  }

  async deleteById(id) {
    const docFound = await this.query.doc(`${id}`)
    await docFound.delete()
  }
}
module.exports = FirebaseContainer;
