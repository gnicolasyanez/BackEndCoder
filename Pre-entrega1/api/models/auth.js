const Container = require("../../utils/classes/Container");
const fs = require("fs");

class Auth extends Container {
  constructor(path) {
    super(path);
  }
  async createNewUser(obj) {
    const json = await this.getAllItems();
    const id = json.length + 1;
    obj.id = id;
    obj.isAdmin = false;
    const registeredUser = json.some((item) => item.user === obj.user);
    if (registeredUser) {
      return "User already exists";
    } else {
      json.push(obj);
    }
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
    });
    return "User created!";
  }
}

module.exports = Auth;