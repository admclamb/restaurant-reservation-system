const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasOnlyValidProperties = require("../utils/has-only-valid-properties");

// Validate tables
const VALID_PROPERTIES = ["capacity", "table_name", "reservation_id"];

function hasRequiredProperties(req, res, next) {
  const { data } = req.body || {};
  if (!data)
    return next({
      status: 400,
      message: "Required table data is missing.",
    });
  const { table_name = null, capacity = null } = data;
  if (!table_name)
    return next({
      status: 400,
      message: "Required property table_name is missing",
    });
  if (typeof table_name !== "string" || table_name.length < 2)
    return next({
      status: 400,
      message:
        "Property table_name must be a string which is at least 2 characters long.",
    });

  if (typeof capacity !== "number" || isNaN(capacity) || !capacity) {
    return next({
      status: 400,
      message:
        "Required property capacity is missing or zero. Must be a number greater than zero.",
    });
  }
  next();
}

const hasOnlyValidProps = hasOnlyValidProperties(...VALID_PROPERTIES);

function hasRequiredSeatingProperties(req, res, next) {
  const { data } = req.body || {};
  let message;
  if (!data)
    message = "Required reservation data missing for table. No data provided.";
  const { reservation_id } = data || "";
  if (!reservation_id)
    message =
      "Required reservation data missing for table. Missing reservation_id.";
  message ? next({ status: 400, message }) : next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: table_id });
}

async function reservationExist(req, res, next) {
  let { reservation_id = null } = req.body.data;
  if (!reservation_id) {
    reservation_id = res.locals.table.reservation_id;
  }
  const reservation = await service.readReservationID(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  // make string rather than INT for consistency
  next({ status: 404, message: reservation_id + "" });
}

// Returns error if table is unoccupied
function tableIsOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    return next();
  }
  next({ status: 400, message: "not occupied" });
}

async function list(req, res) {
  const tables = await service.list();
  // Sort tables in one line
  const sortedTables = tables.sort((a, b) =>
    a.table_name > b.table_name ? 1 : b.table_name > a.table_name ? -1 : 0
  );
  res.status(200).json({ data: sortedTables });
}

async function create(req, res) {
  const { data = {} } = req.body;
  const createdTable = await service.create(data);
  res.status(201).json({ data: createdTable });
}

async function read(req, res) {
  const { table } = res.locals;
  res.status(200).json({ data: table });
}

async function seatReservation(req, res, next) {
  // Seats reservation: updates reservation status and updates table
  const {
    table: { table_id },
    reservation: { reservation_id },
  } = res.locals;
  const data = await service.seatReservation(table_id, reservation_id);
  res.status(200).json({ data });
}

function canSeatReservation(req, res, next) {
  const { status } = res.locals.reservation || null;
  if (status !== "booked") {
    return next({
      status: 400,
      message: `Cannot seat a reservation which is not booked. Status of reservation: ${status}`,
    });
  }
  next();
}

function canSeatTable(req, res, next) {
  const { capacity, table_name, reservation_id } = res.locals.table;
  const { people } = res.locals.reservation;
  let message;
  if (people > capacity) {
    message = `Table ${table_name} only has capacity for ${capacity} guests. Requested party size ${people}.`;
  }
  if (reservation_id) message = `${table_name} is already occupied.`;
  message ? next({ status: 400, message }) : next();
}

// updates reservation to finished and updates occupied table
async function finishTable(req, res, next) {
  const data = await service.finish(res.locals.table);
  res.status(200).json({ data: res.locals.table });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    hasOnlyValidProps,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  seat: [
    asyncErrorBoundary(tableExists),
    hasRequiredSeatingProperties,
    asyncErrorBoundary(reservationExist),
    canSeatReservation,
    canSeatTable,
    asyncErrorBoundary(seatReservation),
  ],
  finishTable: [
    asyncErrorBoundary(tableExists),
    tableIsOccupied,
    asyncErrorBoundary(finishTable),
  ],
};
