const express = require("express");
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
require("dotenv").config();
const routes = require("./api/routes");
const path = "./text.json";
const Container = require("./utils/classes/Container");
const container = new Container(path);
const app = express();

app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("add.hbs");
});

app.get("/products", async (req, res) => {
  res.render("index.hbs", { products: await container.getAllItems() });
});

app.use("/api", routes);

// Listen on port 8080
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});

// const express = require('express');
// const handlebars = require("express-handlebars");

// const app = express();

// app.set("view engine", "hbs");
// app.set("views", "./views");


// // CONFIGURACION DE PLANTILLA

// app.engine(
//     "hbs",
//     handlebars({
//     extname:".hbs",
//     defaultLayout:"index",
//     layoutsDir:"/views/layouts"
// }) )

// // RUTAS
// app.get("/", (req, res) => {
//     res.render("main")
// })

// app.listen(8080, () => {
//     console.log("Server OK!");
// });


