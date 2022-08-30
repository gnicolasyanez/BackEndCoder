require("dotenv").config();

const minimist = require("minimist");
const args = minimist(process.argv.slice(2), {alias: {"p": "port", "m": "modo"}, default:{ "port": 8080, "modo":"fork"}});

const favicon = require("serve-favicon");

const express = require ("express");
const { engine } = require ("express-handlebars");
const {Server: HTTPServer} = require ("http");
const {Server: IOServer} = require ("socket.io");
/* const Contenedor = require ("./src/utils/classConstructor"); */
const {DaoProduct} = require("./src/daos/index");
const DaoFirebaseMessages = require ("./src/daos/messages/DaoFirebaseMessages.js");
const {faker} = require ("@faker-js/faker");
const session = require("express-session");
const passport = require("./passport");
const cookieParser = require("cookie-parser");
const compression = require ("compression")

/* const {mysqlOptions} = require ("./src/utils/config"); */
const loginCheck = require("./middelwares/loginCheck");
const routes = require("./src/routes/routes");

const cluster = require("cluster");
const os = require("os");
const numCPU = os.cpus().length;

const logger = require ( "./src/logger");
const logInfo = require( "./middelwares/logInfo")

/* const productsList = new Contenedor (mysqlOptions,"products"); */
const productsList = new DaoProduct();
const messagesList = new DaoFirebaseMessages();

const app = express ();

const { productRouter } = require ("./routers/productRouter");
const { cartRouter } = require ("./routers/cartRouter");
const { randomsRouter } = require("./routers/randoms");

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
const transport = require("./src/utils/transport")
const client = require("./twilio.js")

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
    socket.emit("products", await productsList.getAll());

    socket.on("new_message",async (message) => {
        await messagesList.save(message)
        io.sockets.emit("messages", await messagesList.normalize())
    })

    socket.on("new_product", async (product) => {
        product.timeStamp = new Date();
        await productsList.save(product)
        io.sockets.emit("products", await productsList.getAll())
    })

    socket.on("new_purchase", async (details) => {
        const {cart, username, email, phone} = details
        let li = ""
        cart.products.forEach(product => {
            li = li + `<li>${product.title} </li>`
        });

        transport.sendMail({
            from: "Facundo <facu.villarroel96@gmail.com>",
            to:process.env.GMAIL_USER,
            html:`<h1>List of items:</h1>
                    <ul> 
                        ${li}
                    </ul>`,
            subject:`New Purchase from the User: ${username}, Email: ${email}`
        }).then((data)=> {
            console.log("Email enviado");
        }).catch(console.log)
        
        client.messages.create({
            to:`whatsapp:${phone}`,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            body: `New Purchase from the User: ${username}, Email: ${email}`
        }).then((data) => {
            console.log("Whatsapp enviado correctamente");
        }).catch(console.log)
        
        client.messages.create({
            to: phone,
            from:process.env.TWILIO_PHONE_NUMBER,
            body:"Your purchase has been recieved"
        }).then((data) => {
            console.log("Mensaje de texto enviado correctamente");
        }).catch(console.log)
    })
})

app.get("/info", compression(), ( req, res ) => {
    const info= {
        args: args,
        sistema:process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage.rss(),
        path: process.cwd(),
        processId:process.pid,
        file:__dirname,
        CPUS: os.cpus().length
    }
    info.keys= Object.keys(info.args)
    res.render("info", {info:info})
})

app.get("/infoConsole", compression(), ( req, res ) => {
    const info= {
        args: args,
        sistema:process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage.rss(),
        path: process.cwd(),
        processId:process.pid,
        file:__dirname,
        CPUS: os.cpus().length
    }
    info.keys= Object.keys(info.args)
    console.log(info);
    res.render("info", {info:info})
})

app.get("/login" , routes.getLogin)

app.post("/login", passport.authenticate("autenticacion", {failureRedirect:"/failLogin"}), routes.postLoguin)

app.get("/register", routes.getRegister)

app.post("/register",upload.single("avatar"), passport.authenticate("registracion", {failureRedirect:"/failRegister"}) , routes.postRegister)

app.get("/failLogin", routes.getFailLogin)

app.get("/failRegister", routes.getFailRegister)

app.get("/productos", loginCheck, routes.getProductos)

app.get("/user/cart", loginCheck, routes.getUserCart)

app.get("/logout", routes.getLogout)

app.get("/api/productos-test", ( req, res) => {
    const mocks = [];
    for (let i = 0; i < 5; i++){
        mocks.push(armarMock())
    }
    res.render("main", {products:mocks});
})

app.use("/api/productos", loginCheck, productRouter);
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

