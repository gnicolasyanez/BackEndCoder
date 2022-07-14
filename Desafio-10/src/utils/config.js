const mysqlOptions = {
  client: "mysql2",
  connection: {
      host: "127.0.0.1",
      user: "admin",
      password: "admin",
      database: "ecommerce"
  }
}

const SQLite3Options = {
  client: "sqlite3",
  connection: {
      filename:"./DB/ecommerce.sqlite"
  },
  useNullAsDefault:true
}

module.exports = {mysqlOptions,SQLite3Options}