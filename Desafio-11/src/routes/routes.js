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

const getProductos = (req,res)=>{
  res.render("main", {user:req.session.passport.user, products:"products"})
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
  getLogout
}