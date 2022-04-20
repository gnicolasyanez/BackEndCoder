const path = "./text.json";
const fs = require("fs");

module.exports = async (req, res) => {
  const data = await fs.promises.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    return JSON.parse(data);
  });
  const dataJson = JSON.parse(data);
  res.json(dataJson);
};