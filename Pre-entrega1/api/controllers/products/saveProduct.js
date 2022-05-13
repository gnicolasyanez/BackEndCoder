const path = "public/products.json";
const getLocalTime = require("../../../utils/functions");
const Product = require("../../models/products");
const product = new Product(path);
const { v4: uuidv4 } = require("uuid");

const saveProduct = async (req, res) => {
  const { title, price, thumbnail, description, stock } = req.body;
  let sku = uuidv4();
  let timestamp = Date.now();
  req.body.sku = sku;
  req.body.timestamp = timestamp;
  let newProduct = {
    title: title,
    price: price,
    thumbnail: thumbnail,
    description: description,
    sku: sku,
    timestamp: getLocalTime(timestamp),
    stock: stock,
  };
  try {
    const prod = await product.createNewProduct(newProduct);
    res.json(prod);
  } catch (error) {
    res.status(500).json({ message: "Product already exists" });
  }
};

module.exports = saveProduct;