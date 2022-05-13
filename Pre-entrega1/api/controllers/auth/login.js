const path = "public/users.json";
const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

const Auth = require("../../models/auth");
const auth = new Auth(path);

async function Login(req, res) {
  try {
    const { user } = req.body;
    const users = await auth.getAllItems();
    const userFound = users.find((currentUser) => currentUser.user === user);

    !userFound && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJs.AES.decrypt(
      userFound.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: userFound._id,
        isAdmin: userFound.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = userFound;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = Login;