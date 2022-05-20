const productsModel = require("../../../models/products");

const getAll = (req, res) =>
  productsModel
    .list()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json(err));

module.exports = getAll;

