const path = "public/cart.json";
const Cart = require("../../models/cart");
const cart = new Cart(path);

const addProductsToCart = async (req, res) => {
  const { products } = req.body;
  const cartId = Number(req.params.cartId);
  await cart.addProductsToCart(cartId, products);
  res.json(`Products added to cart ${cartId}`);
};

module.exports = addProductsToCart;