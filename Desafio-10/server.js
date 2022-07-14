const express = require ("express");
const { engine } = require ("express-handlebars");
const {Server: HTTPServer} = require ("http");
const {Server: IOServer} = require ("socket.io");
const Contenedor = require ("./classConstructor");
const DaoFirebaseMessages = require ("./src/daos/messages/DaoFirebaseMessages.js");
const {faker} = require ("@faker-js/faker");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const {mysqlOptions} = require ("./src/utils/config");
const loginCheck = require("./middelwares/loginCheck")

const productsList = new Contenedor (mysqlOptions,"products");
const messagesList = new DaoFirebaseMessages();

const app = express ();

const { productRouter } = require ("./routers/productRouter");
const { cartRouter } = require ("./routers/cartRouter");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    store:MongoStore.create({
            mongoUrl:"mongodb+srv://user:VGXiKIY4hoVhNYmR@cluster0.p4wsd.mongodb.net/?retryWrites=true&w=majority",
            mongoOptions:{
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
    secret:"facu",
    resave:true,
    rolling:true,
    cookie: {
        maxAge:60000,
    },
    saveUninitialized:false
}))

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

app.get("/login" , ( req, res ) => {
    if (req.session.name){
        res.redirect("/productos")
    } else {
    res.render("login", {})
    }
})

app.post("/login", ( req, res ) => {
        req.session.name = req.body.name
        res.redirect("/productos")
})

app.get("/productos", loginCheck, (req,res)=>{
    productsList.getAll().then(products => {
        res.render("main", {user:req.session.name, products:products})
    })
})

app.get("/logout", loginCheck, ( req, res) => {
    const user = req.session.name
    req.session.destroy((err) => {
        console.log(err);
        res.render("logout" , {user:user})
    });
})

app.get("/api/productos-test", ( req, res) => {
    const mocks = [];
    for (let i = 0; i < 5; i++){
        mocks.push(armarMock())
    }
    res.render("main", {products:mocks});
})

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use( function (req, res) {
    res.send({Error: `ruta ${req.originalUrl} metodo ${req.method} No implementado`})
})

httpServer.listen(8080, ()=> {
    console.log("Server Listening port: 8080");
})