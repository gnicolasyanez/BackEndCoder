const db = require("../config/mariabd");

const list = (params = {}) =>
  db("products").where(params).select("id", "title", "price", "thumbnail");

const create = (obj) => db("products").insert(obj);

const updateItem = (id, obj) => db("products").where({ id }).update(obj);

const remove = (id) => db("products").where({ id }).del();

module.exports = {
  list,
  create,
  updateItem,
  remove,
};