const chatModel = require("../../../models/chat");

const saveProduct = (req, res) => {
  const msg = ({ email, message, time } = req.body);
  return chatModel
    .create(msg)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(404).json(err));
};

module.exports = saveProduct;