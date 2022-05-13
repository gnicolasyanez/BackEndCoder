const path = "public/products.json";
const Product = require("../../models/products");
const product = new Product(path);

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const productFinded = await product.getItemById(id);
  res.json(productFinded);
};

module.exports = getById;