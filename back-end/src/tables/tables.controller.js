const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function list(req, res) {
  const tables = await service.list();
  // Sort tables in one line
  const sortedTables = tables.sort((a, b) =>
    a.table_name > b.table_name ? 1 : b.table_name > a.table_name ? -1 : 0
  );
  res.status(200).json({ data: sortedTables });
}
const VALID_PROPERTIES = ["table_name", "capacity"];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function validateTableName(req, res, next) {
  const { data = {} } = req.body;
  const { table_name = "" } = data;
  if (table_name.length > 1) {
    return next();
  }
  next({ status: 400, message: "table_name" });
}

function validateCapacity(req, res, next) {
  const { data = {} } = req.body;
  const { capacity = null } = data;
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

async function create(req, res) {
  const { data = {} } = req.body;
  const table = data;
  const createdTable = await service.create(table);
  res.status(201).json({ data: createdTable });
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

async function read(req, res) {
  const { table } = res.locals;
  res.status(200).json({ data: table });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validateCapacity,
    validateTableName,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
};
