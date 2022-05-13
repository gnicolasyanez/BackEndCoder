const path = "public/products.json";
const Product = require("../../models/products");
const product = new Product(path);

const updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const { title, price, thumbnail, description } = req.body;
  const dataObj = { title, price, thumbnail, description };
  await product.updateProduct(id, dataObj);
  res.json({ message: `Product with id: ${id} is updated` });
};

module.exports = updateProduct;