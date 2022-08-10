const mysqlOptions = {
  client: "mysql2",
  connection: {
      host: "127.0.0.1",
      user: process.env.MY_SQL_USERNAME,
      password: process.env.MY_SQL_PASSWORD,
      database: process.env.MY_SQL_DATABASE
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