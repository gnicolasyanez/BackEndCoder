const MongoUsers = require ("./persistence");

const getUser = (sessionUser) => {
  const user = MongoUsers.findUser(sessionUser)
  return user
}

module.exports = getUser