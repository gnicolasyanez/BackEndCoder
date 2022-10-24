const express = require ("express");
const orderRouter = express.Router()

orderRouter.use( express.json() );

const OrderService = require("../service/OrderService");
const service = new OrderService(process.env.DATA_BASE_ORDERS)

const {authenticateToken, isAdmin} = require("../../middlewares/auth");

orderRouter.get("/:id", authenticateToken, async ( req, res ) => {
  const orderId = req.params.id
  const order = await service.getOrderById(orderId)
  res.send(order)
})

orderRouter.post("/", authenticateToken, async ( req, res ) => {
  const user = req.user
  const orderGenerated = await service.createNewOrder(user)
  res.send({orderId:orderGenerated.id})
})

orderRouter.delete("/:id", authenticateToken, isAdmin, async ( req, res ) => {
  const id = req.params.id
  const response = await service.deleteOrderById(id)
  res.send(response)
})

module.exports = orderRouter