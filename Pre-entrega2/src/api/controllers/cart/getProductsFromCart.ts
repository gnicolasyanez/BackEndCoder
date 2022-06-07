import { Request, Response } from "express";
const { NODE_ENV } = require("../../../../config");
let Cart =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/cart")
    : require("../../../models/firebase/cart");

module.exports = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const prods = await Cart.getProductsFromCart(id);
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json(error);
  }
};