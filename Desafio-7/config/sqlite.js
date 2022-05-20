const path = require("path");

const sqliteOptions = require("knex")({
  client: "better-sqlite3",
  connection: {
    filename: "db/chat.sqlite",
  },
  useNullAsDefault: true,
});

sqliteOptions.schema.hasTable("chat").then((exists) => {
  if (!exists) {
    sqliteOptions.schema
      .createTable("chat", (table) => {
        table.increments("id").primary();
        table.string("email");
        table.string("message");
        table.string("time");
      })
      .then(() => {
        console.log("Table created");
      })
      .catch((error) => {
        console.error(error);
        throw error;
      })

      .finally(() => {
        sqliteOptions.destroy();
      });
  }
});

module.exports = sqliteOptions;