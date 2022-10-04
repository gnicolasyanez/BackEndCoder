const fs = require("fs")
const router = require("koa-router")
const {buildSchema} = require("graphql")
const { graphqlHTTP } = require('koa-graphql');
const {getAll, getById, modifyProduct, addProduct, deleteById} = require("../controller/resolver")

const schemaString = fs.readFileSync("./src/products/graphql/schemas/product.gql").toString()
const compiledSchema = buildSchema(schemaString)

const graphqlRouter = router()

graphqlRouter.all(
    '/graphql',
    graphqlHTTP({
        schema: compiledSchema,
        rootValue: {
            getAll:getAll,
            getById: getById,
            modifyProduct:modifyProduct,
            addProduct:addProduct,
            deleteById:deleteById
        },
        graphiql: true,
    }),
);

module.exports = graphqlRouter
