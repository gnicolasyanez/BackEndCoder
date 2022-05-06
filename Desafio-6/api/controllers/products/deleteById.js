const fs = require("fs");
const path = "public/products/text.json";

const deleteById = async (req, res) => {
  const id = Number(req.params.id);
  const data = fs.readFileSync(path, "utf8", function (err, data) {
    if (err) throw err;
    return JSON.parse(data);
  });
  const dataJson = JSON.parse(data);
  const item = dataJson.find((item) => item.id === id);
  if (typeof item === "undefined") {
    res.status(404).json({ error: "Product not found" });
  } else {
    dataJson.splice(dataJson.indexOf(item), 1);
    fs.writeFileSync(path, JSON.stringify(dataJson), function (err) {
      if (err) throw err;
    });
    res.status(200).json(`Item with id ${id} was deleted`);
  }
};

module.exports = deleteById;