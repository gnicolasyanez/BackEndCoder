const fs = require("fs");
const path = "./text.json";
const Container = require("./Container");
const Create = require('./CreateJson');

try {
  if (!fs.existsSync(path)) {
    fs.open(path, "w", function (err, file) {
      if (err) throw err;
      console.log("File is opened in write mode.");
    });
  }
} catch (error) {
  console.log(error);
}

// En caso de borrar todos los items comentar el motodo de borrado,
// descomentar la siguiente funcion y correr Node index.js

// Create(path);

const container = new Container(path);

/* container.getAllItems().then((data) => {
  console.log(data);
}
); */

/* container.saveItem({
  title: "Nike Shoes",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}) */

/* container.getItemById(2); */

/* container.deleteItemById(2).then(() => {
  container.getAllItems().then((data) => {
    console.log(data);
  });
}); */

/* container.deleteAllItems().then(() => {
  container.getAllItems().then((data) => {
    console.log(data);
  });
}); */