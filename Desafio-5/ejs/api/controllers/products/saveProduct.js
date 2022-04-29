const path = "./text.json";
const fs = require("fs");

module.exports = async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const data = await fs.promises.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    return JSON.parse(data);
  });
  const dataJson = JSON.parse(data);
  let lastElement = dataJson[dataJson.length - 1];
  let id = lastElement.id + 1;
  req.body.id = id;
  let product = { title: title, price: price, thumbnail: thumbnail, id: id };
  dataJson.push(product);
  fs.writeFileSync(path, JSON.stringify(dataJson), function (err) {
    if (err) throw err;
  });
  res.status(200).render("new-product.ejs", { product: product });
};