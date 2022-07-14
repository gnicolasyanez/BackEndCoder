let dynamicCartImport
let dynamicProductImport
//No funciona poner en el package.json la variable de entorno. Tira error. Por lo tanto hay que hardcodear el resultado
/* let simulationOfEnv = 'files' //reemplaza process.env.<variable>
if(simulationOfEnv === 'files') {
    dynamicCartImport = './daos/cart/cartFiles.js'
    dynamicProductImport = './daos/products/productsFiles.js'
}
else if(simulationOfEnv === 'firebase'){
    dynamicCartImport = './daos/cart/cartFirebase.js'
    dynamicProductImport = './daos/products/productsFirebase.js'
}
else if(simulationOfEnv === 'memory'){
    dynamicCartImport = './daos/cart/cartMemory.js'
    dynamicProductImport = './daos/products/productsMemory.js'
}
else if(simulationOfEnv === 'mongodb'){
    dynamicCartImport = './daos/cart/cartMongodb.js'
    dynamicProductImport = './daos/products/productsMongodb.js'
}
console.log(dynamicCartImport, dynamicProductImport) */

/* 
IMPORTS PARA ARCHIVOS
import CartContainer from './daos/cart/cartFiles.js'
import ProductsContainer from './daos/products/productsFiles.js' */
/*
IMPORTS PARA MEMORIA
import CartContainer from './daos/cart/cartMemory.js'
import ProductsContainer from './daos/products/productsMemory.js' */
/*
IMPORTS PARA FIREBASE
import CartContainer from './daos/cart/cartFirebase.js'
import ProductsContainer from './daos/products/productsFirebase.js' */

import CartContainer from './daos/cart/cartMongodb.js'
import ProductsContainer from './daos/products/productsMongodb.js'

import mongoose from 'mongoose'
mongoose.connect('mongodb+srv://Santi:0xaKPOnA4cviHG9t@cluster0.zioj8jm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

//getting the router
import express from 'express'
const app = express()
const {Router} = express
const productsRouter = Router()
const cartRouter = Router()

//Middlewares to read as json and to read the encoded data from the form
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const user = {
    isAdmin: true
}
//Middleware of validation
const validation = (req, res, next) => {
    if (user.isAdmin) next()
    else res.status(401).send({error: 'You have no permission to enter'})
}

let productsDb = new ProductsContainer()
let cartDb = new CartContainer()

productsRouter.get('/', async(req, res) => {
    let products = await productsDb.getAll()
    res.json(products)
})

productsRouter.get('/:id', async(req, res) => {
    let id = parseInt(req.params.id)
    let product = await productsDb.getById(id)
    res.json(product)
})

//Post of a product by using the form in index or thunder client
productsRouter.post('/', validation, async(req, res) => {
    const product = req.body
    await productsDb.save({
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        description: product.description
    })
    const products = await productsDb.getAll()
    res.json(products)
})

//I created a new method in the class (updateById) to use for this specific situation
productsRouter.put('/:id', validation, async(req, res) => {
    let id = parseInt(req.params.id)
    const product = req.body
    const newArray = await productsDb.updateById(id, {...product})
    res.json(newArray)
})

productsRouter.delete('/:id', validation, async(req, res) => {
    let id = parseInt(req.params.id)
    await productsDb.deleteById(id)
    const productsAfter = await productsDb.getAll()
    res.json(productsAfter)
})

cartRouter.get('/', validation, async(req, res) => {
    const carts = await cartDb.getAll()
    res.json(carts)
})

//Getting a cart product
cartRouter.get('/:idCart/:idProduct', async(req, res) => {
    const idCart = parseInt(req.params.idCart)
    const idProduct = parseInt(req.params.idProduct)
    const cart = await cartDb.getById(idCart)
    const product = cart.products.find(product => product.id === idProduct)
    res.json(product)
})

cartRouter.get('/:id', async(req, res) => {
    let id = parseInt(req.params.id)
    let cartItem = await cartDb.getById(id)
    res.json(cartItem)
})

//Create a new cart
cartRouter.post('/', async(req, res) => {
    await cartDb.save({
        ...req.body
    })
    const carts = await cartDb.getAll()
    res.json(carts)
})

cartRouter.post('/:idCart/:idProduct', async(req, res) => {
    const idCart = parseInt(req.params.idCart)
    const idProduct = parseInt(req.params.idProduct)
    let product = await productsDb.getById(idProduct)
    console.log('product:', product)
    let cart = await cartDb.getById(idCart)
    cart.products.push({...product})
    await cartDb.updateById(idCart, {...cart})
    const cartUpdated = await cartDb.getById(idCart)
    res.json(cartUpdated)
})

cartRouter.delete('/:id', async(req, res) => {
    let id = parseInt(req.params.id)
    await cartDb.deleteById(id)
    const cartAfter = await cartDb.getAll()
    res.json(cartAfter)
})
cartRouter.delete('/:idCart/:idProduct', async(req, res) => {
    let idCart = parseInt(req.params.idCart)
    let idProduct = parseInt(req.params.idProduct)
    let cart = await cartDb.getById(idCart)
    let newCart = cart.products.filter(product => product.id !== idProduct)
    await cartDb.updateById(idCart, {...newCart})
    const cartUpdated = await cartDb.getById(idCart)
    res.json(cartUpdated)
})

//Using the router, with /api/products as the base uri
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

//Listener for the server
const server = app.listen(8080, () => console.log(`Server active at port: ${server.address().port}`))

//Error handler for the server listener
server.on('error', (error) => console.error(`Error on listening to server: ${error}`));

/* 
[{"title":"Backpack","price":250,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-256.png","stock":100,"description":"A bag put on somebody's back. It has two straps that go over the shoulders. It is used to carry things in it, and it often has many pockets or compartments to carry things.","timestamp":"04/05/2022 14:50:05","id":1},{"title":"Ruler","price":40,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png","stock":100,"description":"A tool or device used to measure length and draw straight lines. A ruler is used to measure the length in both metric and customary units. The rulers are marked with standard distance in centimeters in the top and inches in the bottom and the intervals in the ruler are called hash marks.","timestamp":"04/05/2022 14:55:22","id":2},{"title":"Pencil","price":20,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png","stock":100,"description":"A writing or drawing implement with a solid pigment core encased in a sleeve, barrel, or shaft that prevents breaking the core or marking a user's hand.","timestamp":"04/05/2022 14:55:22","id":3},{"title":"Note pad","price":70,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/paper-clip-academic-note-exam-256.png","stock":100,"description":"A book or stack of paper pages that are often ruled and used for purposes such as recording notes or memoranda, other writing, drawing or scrapbooking.","timestamp":"04/05/2022 14:59:09","id":4},{"title":"Calculator","price":100,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png","stock":100,"description":"A device that performs arithmetic operations on numbers. It can do from addition, subtraction, multiplication, and division to more sophisticated operations such as can handle exponential operations, roots, logarithms, etc.","timestamp":"04/05/2022 14:59:09","id":5},{"title":"Board","price":300,"thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-256.png","stock":100,"description":"Is a reusable writing surface on which texts and figures are drawn with chalk or other types of erasable markers. ","timestamp":"04/05/2022 14:59:09","id":6}]
*/