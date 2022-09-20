const DaoFileCarts = require("../carts/daos/DaoFileCarts");
const DaoMemoryCarts = require("../carts/daos/DaoMemoryCarts");
const DaoMongoDbCarts = require("../carts/daos/DaoMongoDbCarts");
const DaoFirebaseCarts = require("../carts/daos/DaoFirebaseCarts");

const DaoFileProducts = require ("../productsAndChat/daos/DaoFileProducts");
const DaoMemoryProducts = require ("../productsAndChat/daos/DaoMemoryProducts");
const DaoMongoDbProducts = require ("../productsAndChat/daos/DaoMongoDbProducts");
const DaoFirebaseProducts = require ("../productsAndChat/daos/DaoFirebaseProducts");

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