const knex = require("../db/connection");

function list() {
  return knex("tables").select("*");
}

function create(reservation) {
  return knex("tables")
    .insert(reservation)
    .returning("*")
    .then((data) => data[0]);
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

module.exports = {
  list,
  create,
  read,
};
