import { Request, Response } from "express";
const { NODE_ENV } = require("../../../../config");
let Product =
  NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/products")
    : require("../../../models/firebase/products");

module.exports = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    await Product.removeById(id);
    res.status(200).json(`Product with id: ${id} deleted!`);
  } catch (error) {
    res.status(500).json(`Product with id: ${id} not found!`);
  }
};