const path = "./text.json";
const Container = require("../../../utils/classes/Container");
const container = new Container(path);

module.exports = async (req, res) => {
  const data = await container.getAllItems();
  res.json(data);
};
