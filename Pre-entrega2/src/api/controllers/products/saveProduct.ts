import { Request, Response } from "express";

import { IProduct } from "../../../utils/types/products";
const { NODE_ENV } = require("../../../../config");
let Product =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/products")
    : require("../../../models/firebase/products");

module.exports = async function (req: Request, res: Response) {
  const newProduct: IProduct = req.body;
  try {
    const savedProduct = await Product.createProduct(newProduct);
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};