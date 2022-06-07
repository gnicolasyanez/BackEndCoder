import { Request, Response } from "express";
const { NODE_ENV } = require("../../../../config");
let Cart =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/cart")
    : require("../../../models/firebase/cart");

module.exports = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    await Cart.deleteCart(id);
    res.status(200).json(`Product with id: ${id} deleted!`);
  } catch (error) {
    res.status(500).json(`Product with id: ${id} not found!`);
  }
};