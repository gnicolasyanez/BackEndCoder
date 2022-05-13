const Container = require("../../utils/classes/Container");
const fs = require("fs");

class Cart extends Container {
  constructor(path) {
    super(path);
  }
  async createNewCart(arr, time) {
    const json = await this.getAllItems();
    const lastElement = json[json.length - 1];
    const id = json.length > 0 ? lastElement.cartId + 1 : 1;
    const cart = {
      cartId: id,
      products: arr,
      timestamp: time,
    };
    json.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
    });
    return cart;
  }

  async deleteProductFromCart(cartId, productId) {
    const json = await this.getAllItems();
    const cart = json.find((cart) => cart.id === cartId);
    const newArray = cart.products.filter(
      (product) => product.id !== productId
    );
    cart.products = newArray;
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
      return `Product with id: ${productId} is deleted from cart with id: ${cartId}`;
    });
  }
  async addProductToCart(cartId, product) {
    const json = await this.getAllItems();
    const cart = json.find((cart) => cart.id === cartId);
    cart.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
      return `Product with id: ${product.id} is added to cart with id: ${cartId}`;
    });
  }

  async deleteCartById(id) {
    const json = await this.getAllItems();

    const newArray = json.filter((item) => item.cartId !== Number(id));
    fs.writeFileSync(this.path, JSON.stringify(newArray), function (err) {
      if (err) throw err;
      console.log("File is saved.");
    });
  }
  async getCartProducts(id) {
    const json = await this.getAllItems();
    const cart = json.find((cart) => cart.cartId === id);
    return cart.products;
  }

  async deleteProductFromCart(cartId, productId) {
    const json = await this.getAllItems();
    const cart = json.find((cart) => cart.cartId === cartId);
    const newArray = cart.products.filter(
      (product) => product.id !== productId
    );
    cart.products = newArray;
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
      return `Product with id: ${productId} is deleted from cart with id: ${cartId}`;
    });
  }

  async addProductsToCart(cartId, products) {
    const json = await this.getAllItems();
    const cart = json.find((cart) => cart.cartId === cartId);
    console.log(cart);
    products.map((product) => {
      cart.products.push(product);
    });
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
      return `Products added to cart with id: ${cartId}`;
    });
  }
}

module.exports = Cart;