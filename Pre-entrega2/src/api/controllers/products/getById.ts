import { Request, Response } from "express";
const { NODE_ENV } = require("../../../../config");
const Product =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/products")
    : require("../../../models/firebase/products");

module.exports = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};