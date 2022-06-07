import { Request, Response } from "express";

import { IProduct } from "../../../utils/types/products";
const { NODE_ENV } = require("../../../../config");
let Cart =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/cart")
    : require("../../../models/firebase/cart");

module.exports = async function (req: Request, res: Response) {
  const newCart: IProduct[] = req.body;
  try {
    const savedProduct = await Cart.createNewCart(newCart);
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};