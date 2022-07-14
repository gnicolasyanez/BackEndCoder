const admin = require("firebase-admin");

const serviceAccount = require("../../firebaseDatos.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://backend-coderhouse-d6df8.firebaseio.com"
});

class FirebaseContainer {
  constructor(db) {
    this.db = admin.firestore();
    this.query = this.db.collection(db)
  }
}
module.exports = FirebaseContainer;
