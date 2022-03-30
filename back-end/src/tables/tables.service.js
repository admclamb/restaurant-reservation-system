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

// A use case: update reservation status when seating table etc...
function updateReservation(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((data) => data[0]);
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then((data) => data[0]);
}

async function updateSeatTable(updatedTable, updatedReservation) {
  try {
    await knex.transaction(async (trx) => {
      const updatedTableResponse = await knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*");
      const updatedReservationResponse = await knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*");

      return { updatedTableResponse, updatedReservationResponse };
    });
  } catch (error) {
    return { error };
  }
}

function destroyReservation(reservation_id) {
  return knex("reservations").where({ reservation_id }).del();
}

module.exports = {
  list,
  create,
  read,
  readReservationID,
  update,
  destroyReservation,
  updateReservation,
  updateSeatTable,
};
