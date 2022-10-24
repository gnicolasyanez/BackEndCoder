const OrderService = require("../service/OrderService");
const service = new OrderService(process.env.DATA_BASE_ORDERS)

const createNewOrder = async ({user}) => {
  return await service.createNewOrder(user)
}

const getOrderById = async ( {id} ) => {
  return await service.getOrderById(id)
}

const deleteOrderById = async ( {id} ) => {
  return await service.deleteOrderById(id)
}

module.exports = {
  createNewOrder,
  getOrderById,
  deleteOrderById
}