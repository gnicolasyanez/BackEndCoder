require("dotenv").config()

const minimist = require("minimist")
const args = minimist(process.argv, {alias: {"p": "port"}})

const express = require ("express");
const { engine } = require ("express-handlebars");
const {Server: HTTPServer} = require ("http");
const {Server: IOServer} = require ("socket.io");
const Contenedor = require ("./src/utils/classConstructor");
const DaoFirebaseMessages = require ("./src/daos/messages/DaoFirebaseMessages.js");
const {faker} = require ("@faker-js/faker");
const session = require("express-session");
const passport = require("./passport")
const cookieParser = require("cookie-parser");

const {mysqlOptions} = require ("./src/utils/config");
const loginCheck = require("./middelwares/loginCheck")
const routes = require("./src/routes/routes")

const productsList = new Contenedor (mysqlOptions,"products");
const messagesList = new DaoFirebaseMessages();

const app = express ();

const { productRouter } = require ("./routers/productRouter");
const { cartRouter } = require ("./routers/cartRouter");
const { randomsRouter } = require("./routers/randoms");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

const armarMock = () => {
    return {
        name: faker.vehicle.vehicle(),
        price: faker.random.numeric(7),
        thumbnail:faker.image.transport(200, 150, true)
    }
}
io.on("connection", async (socket) => {
    const mocks = [];
    for (let i = 0; i < 5; i++){
        mocks.push(armarMock())
    }
    
    socket.emit("messages", await messagesList.normalize());
    socket.emit("products", mocks);
    
    socket.on("new_message",async (message) => {
        await messagesList.save(message)
        io.sockets.emit("messages", await messagesList.normalize())
    })

    socket.on("new_product", async (product) => {
        product.timeStamp = new Date();
        await productsList.save(product)
        io.sockets.emit("products", await productsList.getAll())
    })
})

app.get("/info", ( rqe, res ) => {
    const info= {
        args: args,
        sistema:process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage.rss(),
        path: process.cwd(),
        processId:process.pid,
        file:__dirname
    }
    info.keys= Object.keys(info.args)
    res.render("info", {info:info})
})

app.get("/login" , routes.getLogin)

app.post("/login", passport.authenticate("autenticacion", {failureRedirect:"/failLogin"}), routes.postLoguin)

app.get("/register", routes.getRegister)

app.post("/register", passport.authenticate("registracion", {failureRedirect:"/failRegister"}) , routes.postRegister)

app.get("/failLogin", routes.getFailLogin)

app.get("/failRegister", routes.getFailRegister)

app.get("/productos", loginCheck, routes.getProductos)

app.get("/logout", routes.getLogout)

app.get("/api/productos-test", ( req, res) => {
    const mocks = [];
    for (let i = 0; i < 5; i++){
        mocks.push(armarMock())
    }
    res.render("main", {products:mocks});
})

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/randoms", randomsRouter);

app.use((req, res) => {
    res.send({Error: `ruta ${req.originalUrl} metodo ${req.method} No implementado`})
})

httpServer.listen(args.port || 8080, ()=> {
    console.log("Server Listening port: ", args.port || 8080);
})