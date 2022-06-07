// config.js
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV.trim() + ".env"),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "mongo",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 8080,
  DB_TYPE: process.env.DB_TYPE || "mongo",
  FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
  FIREBASE_APPID: process.env.FIREBASE_APPID,
  FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
};