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
}
module.exports = FirebaseContainer;
