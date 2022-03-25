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

// CHecking reservations table
function readReservationID(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

module.exports = {
  list,
  create,
  read,
  readReservationID,
  update,
};
