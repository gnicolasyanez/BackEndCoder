const {DaoProduct} = require("../src/daoFactory");
const DaoFirebaseMessages = require ("../productsAndChat/messages/DaoFirebaseMessages.js");


const handleNewPurchase = require("../productsAndChat/handleNewPurchase");

const productsList = new DaoProduct();
const messagesList = new DaoFirebaseMessages();

const ioFunction = async (io, socket) => {

  socket.emit("messages", await messagesList.normalize());
  socket.emit("products", await productsList.getAll());

  socket.on("new_message",async (message) => {
      await messagesList.save(message)
      io.sockets.emit("messages", await messagesList.normalize())
  })

  socket.on("new_product", async () => {
      io.sockets.emit("products", await productsList.getAll())
  })

  socket.on("new_purchase", async (details) => {
      const {cart, username, email, phone} = details
      handleNewPurchase(cart, username, email, phone)
  })
}

module.exports = ioFunction