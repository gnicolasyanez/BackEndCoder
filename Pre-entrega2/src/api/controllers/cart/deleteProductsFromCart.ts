import { Request, Response } from "express";
const { NODE_ENV } = require("../../../../config");

let Cart =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/cart")
    : require("../../../models/firebase/cart");

import { IProduct } from "../../../utils/types/products";

module.exports = async function (req: Request, res: Response) {
  const prods: IProduct[] = req.body;
  const id: string = req.params.id;

  try {
    const updatedCart = await Cart.deteleProductsFromCart(id, prods);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(`Product with id: ${id} not found!`);
  }
};