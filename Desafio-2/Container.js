const fs = require("fs");

class Container {
    constructor(path) {
        this.path = path;
    }
    async getAllItems() {
    const data = await fs.promises.readFile(this.path, "utf8", function (err, data) {
        if (err) throw err;
        const json = JSON.parse(data);
        return json;
        });
    return JSON.parse(data);
    }  
    async saveItem(obj) {
    const json = await this.getAllItems();
    const id = json.length + 1;
    obj.id = id;
    json.push(obj);
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
        if (err) throw err;
        });
    console.log(id);
    }
    getItemById(id) {
        fs.readFile(this.path, "utf8", function (err, data) {
        if (err) throw err;
        const json = JSON.parse(data);
        const item = json.find((item) => item.id === id);
        if (typeof item === "undefined") {
        console.log(null);
        } else {
        console.log(item);
        }
        });
    }
    async deleteItemById(id) {
        const json = await this.getAllItems();
        const newArray = json.filter((item) => item.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(newArray), function (err) {
            if (err) throw err;
            console.log("File is saved.");
            });
        ;
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