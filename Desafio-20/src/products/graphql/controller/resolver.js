const ProductService = require("../../service/ProductService")
const service = new ProductService(process.env.DATA_BASE_PRODUCTS)

const getAll = async () => {
  return await service.getAllProducts()
}

const getById = async (id) => {
  const prodFound = await service.getProduct(id.id)
  return prodFound
}

const modifyProduct = async ( {args} ) => {
  const {title, code, description, id, price, stock, thumbnail} = args
  const productUpdate = {
    title:title,
    code:code,
    description:description, 
    id:id, 
    price: price, 
    stock: stock, 
    thumbnail: thumbnail}
  const modifiedProduct = await service.putProduct(productUpdate.id, productUpdate)
  return modifiedProduct
}

const addProduct = async (product) => {
  return await service.postProduct(product)
}

const deleteById = async (id) => {
  return await service.deleteProduct(id.id)
}

module.exports = {getAll, getById, modifyProduct, addProduct, deleteById}