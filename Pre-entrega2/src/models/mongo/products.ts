import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");
import { IProduct } from "../../utils/types/products";

const schema = new Schema(
  {
    title: String,
    price: Number,
    thumbnail: String,
    description: String,
    sku: String,
    stock: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

schema.statics.removeById = async function (id: string) {
  try {
    const searchAndDelete = await this.deleteOne({ _id: id });
    if (searchAndDelete.deletedCount === 0)
      throw new Error("Product not found");
    return `Product with id: ${id} deleted!`;
  } catch (error: any) {
    throw new Error(error);
  }
};

schema.statics.findById = async function (id: string): Promise<IProduct> {
  try {
    const product = await this.findOne({ _id: id });
    if (!product) throw new Error("Product not found");
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
};

schema.statics.findAll = async function (): Promise<IProduct[]> {
  try {
    return await this.find();
  } catch (error: any) {
    throw new Error(error);
  }
};

schema.statics.createProduct = async function (
  product: IProduct
): Promise<IProduct> {
  try {
    const id = uuidv4();
    product.sku = id;
    const newProduct = new this(product);
    return await newProduct.save();
  } catch (error: any) {
    throw new Error(error);
  }
};

schema.statics.updateProduct = async function (
  id: string,
  product: IProduct
): Promise<IProduct> {
  try {
    return await this.findByIdAndUpdate(
      id,
      {
        $set: product,
      },
      { new: true }
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

const Product = mongoose.model("Products", schema);

module.exports = Product;