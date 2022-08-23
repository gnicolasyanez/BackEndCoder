const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const MongoUsers = require ("./src/mongoose")

passport.use('registracion', new LocalStrategy( async (username, password, callback) => {
  const user = (await MongoUsers.findUser(username))[0]
  if (user) {return callback()}
  const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = { username, password: passwordHasheado };
  MongoUsers.addUser(newUser)
  callback(null, newUser);
}));

passport.use('autenticacion', new LocalStrategy( async (username, password, callback) => {
  const user = (await MongoUsers.findUser(username))[0]
  if (!user || !bcrypt.compareSync(password, user.password)) return callback();
  callback(null, user);
}));

passport.serializeUser((user, callback) => {
  callback(null, user.username);
});

passport.deserializeUser(async (username, callback) => {
  const user = (await MongoUsers.findUser(username))[0]
  callback(null, user);
});

module.exports = passport;