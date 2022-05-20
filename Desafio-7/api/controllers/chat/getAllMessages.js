const chatModel = require("../../../models/chat");

const getAll = (req, res) =>
  chatModel
    .list()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(404).json(err));

module.exports = getAll;