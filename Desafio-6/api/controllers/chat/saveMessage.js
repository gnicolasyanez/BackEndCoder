const path = "public/chat/chat.json";
const fs = require("fs");

const saveMessage = async (req, res) => {
  const { email, message, time } = req.body;
  console;
  const data = await fs.promises.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    return JSON.parse(data);
  });
  const dataJson = JSON.parse(data);
  let lastElement = dataJson[dataJson.length - 1];
  let id = lastElement.id + 1;
  req.body.id = id;
  let product = { email: email, message: message, time: time, id: id };
  dataJson.push(product);
  fs.writeFileSync(path, JSON.stringify(dataJson), function (err) {
    if (err) throw err;
  });
  res.json(product);
};

module.exports = saveMessage;