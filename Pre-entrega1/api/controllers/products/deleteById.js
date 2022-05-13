const path = "public/products.json";
const Product = require("../../models/products");
const product = new Product(path);

const deleteById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    product.deleteProductById(id);
    res.json({ message: `Product with id: ${id} is deleted` });
  } catch (error) {
    res.status(500).json({ message: `Product with id: ${id} not found` });
  }
};

module.exports = deleteById;