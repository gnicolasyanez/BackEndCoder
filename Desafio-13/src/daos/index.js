const DaoFileCarts = require("./carts/DaoFileCarts");
const DaoMemoryCarts = require("./carts/DaoMemoryCarts");
const DaoMongoDbCarts = require("./carts/DaoMongoDbCarts");
const DaoFirebaseCarts = require("./carts/DaoFirebaseCarts");

const DaoFileProducts = require ("./products/DaoFileProducts");
const DaoMemoryProducts = require ("./products/DaoMemoryProducts");
const DaoMongoDbProducts = require ("./products/DaoMongoDbProducts");
const DaoFirebaseProducts = require ("./products/DaoFirebaseProducts");

let containerToExportProduct = "";
let containerToExportCart = "";

switch(process.env.DATA_BASE_PRODUCTS){
  case "fs": containerToExportProduct = DaoFileProducts;
  break;
  case "memory": containerToExportProduct = DaoMemoryProducts;
  break;
  case "mongoDb": containerToExportProduct = DaoMongoDbProducts;
  break;
  case "firebase": containerToExportProduct = DaoFirebaseProducts;
  break;
}

switch(process.env.DATA_BASE_CARTS){
  case "fs": containerToExportCart = DaoFileCarts;
  break;
  case "memory": containerToExportCart = DaoMemoryCarts;
  break;
  case "mongoDb": containerToExportCart = DaoMongoDbCarts;
  break;
  case "firebase": containerToExportCart = DaoFirebaseCarts;
  break;
}

const DaoProduct = containerToExportProduct
const DaoCart = containerToExportCart

module.exports=  {DaoProduct, DaoCart}