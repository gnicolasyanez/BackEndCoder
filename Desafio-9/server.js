
import { Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import express from 'express'
import { engine } from 'express-handlebars'
import { faker } from '@faker-js/faker'
import { schema, normalize } from 'normalizr'
import { FirebaseContainer } from './src/containers/firebaseContainer.js'

const app = express()
app.use(express.static('public'))

const httpServer = new HttpServer(app)
const socketServer = new SocketServer(httpServer)

app.engine('handlebars', engine())
app.set('views', './hbs_views')
app.set('view engine', 'handlebars')

/* 
const mysqlOptions = {
    host: '127.0.0.1',
    user: 'root',
    password: 'amorfoda70',
    database: 'business'
}
const sqliteOptions = {
    filename: './db/messages.sqlite'
}
const mysqlKnex = {
    client: 'mysql2',
    connection: mysqlOptions
}
const sqlite3Knex = {
    client: 'sqlite3',
    connection: sqliteOptions,
    useNullAsDefault: true
} */

const createProductsArray = (num) => {
    const productsArray = []
    for (let i = 1; i <= num; i++) {
        const product = createFakeProduct(i)
        productsArray.push(product)
    }
    return productsArray
}

const createFakeProduct = (id) => {
    const product = {
        id: id,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: `${faker.image.business()}?${id}`
    }
    return product
}

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });

const messageSchema = new schema.Entity('message', { author: authorSchema }, { idAttribute: 'id' })

const messagesSchema = new schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' })

const messagesNormalized = (messages) => normalize({ id: 'messages', messages: messages }, messagesSchema)

const messagesDb = new FirebaseContainer('messages')

let productsArray = createProductsArray(5)
//Get to /products that sends the array and renders it
app.get('/products', async(req, res) => {
    res.render('home', {products: productsArray})
})

//Setting the connection socket event later to be called in the main.js file with the information
socketServer.on('connection', async(socket) => {
    const messages = await messagesDb.getAll()
    const products = productsArray

    socket.emit('messages', messagesNormalized(messages))
    socket.emit('products', products)

    //On new_"X" event, i'll first push to the array the new info, write it in the txt file so that it lasts in memory and emit it globally.
    socket.on('new_message', (message) => {
        messagesDb.save(message)
        socketServer.sockets.emit('messages', messagesNormalized(messages))
    })
}) 

//Listening to the server but with http this time
const server = httpServer.listen(8080, () => console.log(`Server active at port: ${server.address().port}`))