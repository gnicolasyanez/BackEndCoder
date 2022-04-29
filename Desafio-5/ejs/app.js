const express = require("express");
const app = express();
// require("dotenv").config();
const routes = require("./api/routes");
const path = "./text.json";
const Container = require("./utils/classes/Container");
const container = new Container(path);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

// Create Express App

app.get("/", (req, res) => {
  res.render("add.ejs");
});

app.get("/products", async (req, res) => {
  res.render("index.ejs", { products: await container.getAllItems() });
});

app.use("/api", routes);

// Listen on port 8080
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});