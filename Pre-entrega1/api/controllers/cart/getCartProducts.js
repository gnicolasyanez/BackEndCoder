const path = "public/cart.json";
const Cart = require("../../models/cart");
const cart = new Cart(path);

const getCartProducts = async (req, res) => {
  const id = Number(req.params.cartId);
  const cartFinded = await cart.getCartProducts(id);
  res.json(cartFinded);
};
module.exports = getCartProducts;