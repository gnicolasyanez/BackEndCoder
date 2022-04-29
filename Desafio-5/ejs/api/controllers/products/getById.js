const path = "./text.json";
const fs = require("fs");

module.exports = async (req, res) => {
  const id = Number(req.params.id);
  const data = await fs.promises.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    return JSON.parse(data);
  });
  const dataJson = JSON.parse(data);
  const item = dataJson.find((item) => item.id === id);
  if (typeof item === "undefined") {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.status(200).json(item);
  }
};