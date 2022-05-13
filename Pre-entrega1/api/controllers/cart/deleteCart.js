const path = "public/cart.json";
const Cart = require("../../models/cart");
const cart = new Cart(path);

const deleteCartById = (req, res) => {
  const { cartId } = req.params;
  try {
    cart.deleteCartById(cartId);
    res.json({ message: `Cart with id: ${cartId} is deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCartById;