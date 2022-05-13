const path = "public/cart.json";
const Cart = require("../../models/cart");
const cart = new Cart(path);

const deleteProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    await cart.deleteProductFromCart(Number(cartId), Number(productId));
    res.status(200).json({ message: "Product deleted from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = deleteProductFromCart;