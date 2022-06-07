import { Request, Response } from "express";
const { NODE_ENV } = require("../../../../config");

let Product =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/products")
    : require("../../../models/firebase/products");

import { IProduct } from "../../../utils/types/products";

module.exports = async function (req: Request, res: Response) {
  const prod: IProduct = req.body;
  const id: string = req.params.id;
  try {
    const updatedProduct = await Product.updateProduct(id, prod);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(`Product with id: ${id} not found!`);
  }
};