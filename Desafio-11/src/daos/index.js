const DaoFileCarts = require("../src/daos/carts/DaoFileCarts");
const DaoMemoryCarts = require("../src/daos/carts/DaoMemoryCarts");
const DaoMongoDbCarts = require("../src/daos/carts/DaoMongoDbCarts");
const DaoFirebaseCarts = require("../src/daos/carts/DaoFirebaseCarts");

const DaoFileProducts = require ("../src/daos/products/DaoFileProducts");
const DaoMemoryProducts = require ("../src/daos/products/DaoMemoryProducts");
const DaoMongoDbProducts = require ("../src/daos/products/DaoMongoDbProducts");
const DaoFirebaseProducts = require ("../src/daos/products/DaoFirebaseProducts");

let containerToExportProduct = "";
let containerToExportcart = "";

const DATA_BASE_PRODUCTS = "fs"
const DATA_BASE_CARTS = "fs"

switch(DATA_BASE_PRODUCTS){
  case "fs": containerToExportProduct = DaoFileProducts;
  break;
  case "memory": containerToExportProduct = DaoMemoryProducts;
  break;
  case "mongoDb": containerToExportProduct = DaoMongoDbProducts;
  break;
  case "firebase": containerToExportProduct = DaoFirebaseProducts;
  break;
}

switch(DATA_BASE_CARTS){
  case "fs": containerToExportcart = DaoFileCarts;
  break;
  case "memory": containerToExportcart = DaoMemoryCarts;
  break;
  case "mongoDb": containerToExportcart = DaoMongoDbCarts;
  break;
  case "firebase": containerToExportcart = DaoFirebaseCarts;
  break;
}

const ContainerProduct = await import(containerToExportProduct);
const ContainerCart = await import(containerToExportcart);

export const DaoProduct = ContainerProduct;
export const DaoCart = ContainerCart;