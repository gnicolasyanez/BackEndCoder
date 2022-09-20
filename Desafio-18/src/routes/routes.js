const { service:carts } = require("../../carts/cartRouter")
const getUser = require("../../loginAndRegister/service")

const getLogin = ( req, res ) => {
  if (req.isAuthenticated()) res.redirect("/productos")
  else res.render("login", {})
}

const postLoguin = (req, res ) =>{
  res.redirect("/productos")
}

const getRegister = ( req, res ) => {
  if (req.isAuthenticated()) res.redirect("/productos")
  else res.render("register", {})
}

const postRegister = (req, res ) => {
  res.redirect("/login")
}

const getFailLogin = ( req, res ) => {
  res.render("failLogin", {})
}

const getFailRegister = ( req, res ) => {
  res.render("failRegister", {})
}

const getProductos = async (req,res)=>{
  const user = await getUser(req.session.passport.user)
  const { username, email, name, surname, address, age, phone, isAdmin, cartId } = user
  res.render("main", {username, email, name, surname, address, age, phone, isAdmin, cartId, products:"products"})
}

const getUserCart = async ( req, res ) => {
  const user = await getUser(req.session.passport.user)
  const {cartId, username, email, phone} = user
  const cart = await carts.getById(cartId)
  res.render("cartProducts", {products: cart.products, cartId, username, email, phone})
}

const getLogout = async ( req, res, next) => {
  const username = req.user.username
  req.logout(function(err){
    if (err) return next(err);
  })
  res.render("logout" , {user:username});
}


module.exports = {
  getLogin,
  postLoguin,
  getRegister,
  postRegister,
  getFailLogin,
  getFailRegister,
  getProductos,
  getLogout,
  getUserCart
}