const productsModel = require("../../../models/products");

const getById = (req, res) =>
  productsModel
    .list({ id: req.params.id })
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json(err));

module.exports = getById;