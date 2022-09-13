require("dotenv").config();

const minimist = require("minimist");
const args = minimist(process.argv.slice(2), {alias: {"p": "port", "m": "modo"}, default:{ "port": 8080, "modo":"fork"}});

const favicon = require("serve-favicon");

const express = require ("express");
const { engine } = require ("express-handlebars");
const {Server: HTTPServer} = require ("http");
const {Server: IOServer} = require ("socket.io");
const session = require("express-session");
const passport = require("./loginAndRegister/passport");
const cookieParser = require("cookie-parser");
const compression = require ("compression")

const loginCheck = require("./middelwares/loginCheck");
const routes = require("./src/routes/routes");

const cluster = require("cluster");

const os = require("os");
const numCPU = os.cpus().length;
const getinfo = require("./info/info")

const logger = require ( "./logs/logger");
const logInfo = require( "./logs/logInfo")

const app = express ();

const { productRouter } = require ("./productsAndChat/productRouter");
const { cartRouter } = require ("./carts/cartRouter");
const { randomsRouter } = require("./randomNumbers/randoms");

const multer = require("multer");
/* const mimeTypes = require("mime-types") */

const upload = multer({
    storage: multer.diskStorage({
        destination: "public/avatars/",
        filename: function(req, file, cb){
            cb("", req.body.username +".jpeg" /*+ mimeTypes.extension(file.mimetype) */);
        }
    })
})


app.use(favicon(__dirname + "/public/images/favicon.ico"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logInfo)

app.use(session({
    secret:process.env.SESION_SECRET,
    resave:true,
    rolling:true,
    cookie: {
        maxAge:600000,
    },
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/", loginCheck, ( req, res ) => {
    res.sendFile(__dirname+"/public/index.html")
})

app.use(express.static("public"));

app.engine (
    "hbs",
    engine({
        extname:".hbs",
        defaultLayout:"index.hbs",
    })
    )
    
app.set("views","./hbs_views");
app.set("view engine", "hbs");

const httpServer = new HTTPServer (app);
const io = new IOServer (httpServer);
const ioFunction = require("./ioServer/io");

io.on("connection", async (socket) => {
    ioFunction(io, socket)
})

app.get("/info", compression(), getinfo)

app.get("/login" , routes.getLogin)

app.post("/login", passport.authenticate("autenticacion", {failureRedirect:"/failLogin"}), routes.postLoguin)

app.get("/register", routes.getRegister)

app.post("/register",upload.single("avatar"), passport.authenticate("registracion", {failureRedirect:"/failRegister"}) , routes.postRegister)

app.get("/failLogin", routes.getFailLogin)

app.get("/failRegister", routes.getFailRegister)

app.get("/productos", loginCheck, routes.getProductos)

app.get("/user/cart", loginCheck, routes.getUserCart)

app.get("/logout", routes.getLogout)

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/randoms", randomsRouter);

app.use((req, res) => {
    logger.warn(`Ruta: ${req.originalUrl} Método: ${req.method} No implementado`)
    res.send({Error: `ruta ${req.originalUrl} metodo ${req.method} No implementado`})
})

const PORT = process.env.PORT || args.port;

if ( process.env.MODE == "cluster") {
    if(cluster.isPrimary) {
        for (let i = 0; i < numCPU; i++){
            cluster.fork()
        }
    } else {
        httpServer.listen(PORT, () => {})
    }
} else {
    httpServer.listen(PORT, () => {
        console.log(`Escuchando en el puerto ${httpServer.address().port}`);
    })
}

