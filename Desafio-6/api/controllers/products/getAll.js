const path = "public/products/text.json";
const Container = require("../../../utils/classes/Container");
const container = new Container(path);

const getAll = async (req, res) => {
  const data = await container.getAllItems();
  res.json(data);
};

module.exports = getAll;