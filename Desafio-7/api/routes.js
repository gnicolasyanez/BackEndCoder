const productsModel = require("../../../models/products");

const deleteById = (req, res) => {
  const product = ({ title, price, thumbnail } = req.body);
  return productsModel
    .remove(req.params.id, product)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
};

module.exports = deleteById;