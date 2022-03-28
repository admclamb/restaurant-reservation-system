const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/has-properties");
const hasOnlyValidProperties = require("../utils/has-only-valid-properties");

// Validate tables
const VALID_TABLE_PROPERTIES = ["table_name", "capacity"];
const hasOnlyValidTableProps = hasOnlyValidProperties(
  ...VALID_TABLE_PROPERTIES
);
const hasRequiredTableProperties = hasProperties(...VALID_TABLE_PROPERTIES);

function validateTableName(req, res, next) {
  const { table_name = "" } = req.body.data;
  if (table_name.length > 1) {
    return next();
  }
  next({ status: 400, message: "table_name" });
}

function validateCapacity(req, res, next) {
  const { capacity = null } = req.body.data;
  if (!capacity) {
    return next({
      status: 400,
      message: "capacity",
    });
  }
  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity",
    });
  }
  if (capacity <= 0) {
    return next({
      status: 400,
      message: "capacity",
    });
  }
  next();
}
async function hasSufficientCapacity(req, res, next) {
  const { table = {} } = res.locals;
  const { capacity = "" } = table;
  const { reservation_id = "" } = req.body.data;
  const reservation = (await service.readReservationID(reservation_id)) || {};
  const { people = null } = reservation;
  if (people <= capacity) {
    return next();
  }
  next({ status: 400, message: "capacity" });
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
  const { reservation_id = "" } = req.body.data;
  const reservation = await service.readReservationID(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: reservation_id + "" });
}

function validateDataProperty(req, res, next) {
  const { data = null } = req.body;
  if (data) {
    return next();
  }
  next({ status: 400, message: "data" });
}

function validateReservationID(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_id = null } = req.body.data;
  if (!data["reservation_id"]) {
    return next({ status: 400, message: "reservation_id" });
  }
  if (reservation_id) {
    return next();
  }
  next({ status: 400, message: "reservation_id" });
}

function tableIsOccupied(req, res, next) {
  const { table = {} } = res.locals;
  if (table.occupied) {
    return next({ status: 400, message: "occupied" });
  }
  next();
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

async function update(req, res, next) {
  try {
    const updatedTable = {
      ...res.locals.table,
      reservation_id: req.body.data.reservation_id,
      occupied: true,
    };
    const data = await service.update(updatedTable);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

// Destorys reservation and updates occupied
async function destroy(req, res, next) {
  const { table } = res.locals;
  const { reservation_id = "" } = table;
  const deletedReservation = await service.destroyReservation(reservation_id);
  res.status(200).json({ data: deletedReservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredTableProperties,
    hasOnlyValidTableProps,
    validateCapacity,
    validateTableName,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(tableExists),
    validateDataProperty,
    validateReservationID,
    asyncErrorBoundary(reservationExist),
    asyncErrorBoundary(hasSufficientCapacity),
    tableIsOccupied,
    asyncErrorBoundary(update),
  ],
  destroy: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(update),
    asyncErrorBoundary(destroy),
  ],
};
