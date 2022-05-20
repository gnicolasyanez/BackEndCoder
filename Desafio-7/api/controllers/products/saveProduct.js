const productsModel = require("../../../models/products");

const saveProduct = (req, res) => {
  const product = ({ title, price, thumbnail } = req.body);
  return productsModel
    .create(product)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
};

module.exports = saveProduct;