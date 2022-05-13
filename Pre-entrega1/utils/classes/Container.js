const fs = require("fs");

class Container {
  constructor(path) {
    this.path = path;
  }
  async getAllItems() {
    const data = await fs.promises.readFile(
      this.path,
      "utf8",
      function (err, data) {
        if (err) throw err;
        return JSON.parse(data);
      }
    );
    return JSON.parse(data);
  }

  async deleteAllItems() {
    const json = await this.getAllItems();
    for (let i = json.length; i > 0; i--) {
      json.pop();
    }
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
      console.log("File is saved.");
    });
  }
}

module.exports = Container;