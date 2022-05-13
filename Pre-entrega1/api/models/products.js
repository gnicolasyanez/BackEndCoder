const Container = require("../../utils/classes/Container");
const fs = require("fs");

class Products extends Container {
  constructor(path) {
    super(path);
  }
  async getItemById(id) {
    const json = await this.getAllItems();
    const item = json.find((item) => item.id === id);
    if (typeof item === "undefined") {
      throw new Error("Product not found");
    } else {
      return item;
    }
  }
  async deleteProductById(id) {
    const json = await this.getAllItems();
    const newArray = json.filter((item) => item.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(newArray), function (err) {
      if (err) throw err;
      console.log("File is saved.");
    });
  }
  async createNewProduct(obj) {
    const json = await this.getAllItems();
    const lastElement = json[json.length - 1];
    const id = json.length > 0 ? lastElement.id + 1 : 1;
    obj.id = id;
    console.log("====================================");
    console.log(obj);
    console.log("====================================");
    const registeredProduct = json.some((item) => item.title === obj.title);
    if (registeredProduct) {
      throw new Error("Product already exists");
    } else {
      json.push(obj);
      fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
        if (err) throw err;
      });
      return obj;
    }
  }
  async updateProduct(id, obj) {
    const json = await this.getAllItems();
    const item = json.find((item) => item.id === id);
    if (typeof item === "undefined") {
      throw new Error("Product not found");
    } else {
      item.title = obj.title;
      item.price = obj.price;
      item.thumbnail = obj.thumbnail;
      item.description = obj.description;
      fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
        if (err) throw err;
      });
      return item;
    }
  }
}

module.exports = Products;