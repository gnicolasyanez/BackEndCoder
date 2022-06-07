import express from "express";
import { Server } from "socket.io";
const shrinkRay = require("shrink-ray-current");
const { NODE_ENV, PORT } = require("../config.js");
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
const trim = NODE_ENV.trim();

let Products: any;
if (trim === "mongo") {
  require(`./config/mongo`);
  require("./models/mongo/products");
  require("./models/mongo/cart");
  Products = require("./models/mongo/products");
} else {
  require(`./config/firebase`);
  require("./models/firebase/products");
  Products = require("./models/firebase/products");
}

const routes = require("./api/routes");
const app = express();
const http = require("http").Server(app);
const io = new Server(http);

app.use(
  shrinkRay({
    useZopfliForGzip: false,
  })
);

app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", (_req, res) => {
  res.render("add.hbs");
});

io.on("connection", (socket) => {
  socket.on("add product", (msg) => {
    io.emit("add product", msg);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.get("/products", async (_req, res) => {
  try {
    const products = await Products.findAll();
    res.render("index.hbs", { products });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.use("/api", routes);

// Listen on port 8080
http.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});