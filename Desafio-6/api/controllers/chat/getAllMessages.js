const path = "public/chat/chat.json";
const Container = require("../../../utils/classes/Container");
const container = new Container(path);

const getAllMessages = async (req, res) => {
  const data = await container.getAllItems();
  res.json(data);
};

module.exports = getAllMessages;