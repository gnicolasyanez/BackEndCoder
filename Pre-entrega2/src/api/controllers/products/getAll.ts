import { Request, Response } from "express";
import { IProduct } from "../../../utils/types/products";
const { NODE_ENV } = require("../../../../config");
let Product =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/products")
    : require("../../../models/firebase/products");

module.exports = async (_req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.findAll();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
© 2022 GitHub, Inc.
Terms