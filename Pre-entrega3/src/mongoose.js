const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {type: String},
    password: {type: String},
    email: {type: String},
    name: {type: String},
    surname: {type: String},
    address: {type: String},
    age: {type: Number},
    phone: {type: String},
    isAdmin:{type: Boolean},
    cartId:{type:Number}
  }
)

const users = mongoose.model("users", userSchema);

const conexion = `mongodb+srv://user:VGXiKIY4hoVhNYmR@cluster0.p4wsd.mongodb.net/?retryWrites=true&w=majority`

class MongoUser {
  constructor() {
    this.connection = conexion
    this.model = users
  }
  mongoConected() {
    mongoose.connect(this.connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async addUser(user) {
    try{
      this.mongoConected()
      const newUser = this.model(user)
      await newUser.save()
    } catch (err){
      console.log(err);
    }
  } 

  async findUser (username) {
    try{
      this.mongoConected()
      const user = this.model.find({username:username})
      return user
    } catch (err){
      console.log(err);
    }
  }

  async modifyUserCartId (username, newCartId) {
    const user = await this.findUser(username);
    user.cartId = newCartId
    await this.collection.updateOne({id:user.id},{$set:{...user}})
  }
}

module.exports = MongoUsers = new MongoUser()