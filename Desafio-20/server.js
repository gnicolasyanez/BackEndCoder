require("dotenv").config()

const koa = require("koa");
const koaBody = require("koa-body");
const hbs = require('koa-views-handlebars');

const productsRouter = require("./src/products/router/productsRouter")
const routes = require("./src/routes/routes")

const app = new koa();
app.use(koaBody())

app.use(hbs(__dirname + '/public/views', {
  partialsDirs: __dirname + '/public/views'
}));

app.use(routes.routes())

const graphqlRouter = require("./src/products/graphql/router/graphqlRouter")

app.use(graphqlRouter.routes());

app.use(productsRouter.routes())
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`escuchando en puerto: ${PORT}`);
})