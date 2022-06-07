const fs = require("fs");

interface Container {
  path: string;
}

class Container {
  constructor(path: string) {
    this.path = path;
  }
  async getAllItems() {
    const data = await fs.promises.readFile(
      this.path,
      "utf8",
      function (err: string, data: string) {
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
    fs.writeFileSync(this.path, JSON.stringify(json), function (err: string) {
      if (err) throw err;
      console.log("File is saved.");
    });
  }
}

module.exports = Container;