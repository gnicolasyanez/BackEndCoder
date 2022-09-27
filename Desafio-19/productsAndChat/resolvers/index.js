const ProductService = require("../service")
const service = new ProductService(process.env.DATA_BASE_PRODUCTS)

const getAll = async () => {
  return await service.getAllProducts()
}

const getById = async (id) => {
  const prodFound = await service.getProduct(id)
  return prodFound
}

const modifyProduct = async ( ModifyProductPayload ) => {
  const modifiedProduct = await service.putProduct(ModifyProductPayload.id, ModifyProductPayload)
  return modifiedProduct
}

const addProduct = async (product) => {
  return await service.postProduct(product)
}

const deleteById = async (id) => {
  return await service.deleteProduct(id)
}

module.exports = {getAll, getById, modifyProduct, addProduct, deleteById}