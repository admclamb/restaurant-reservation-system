const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES);

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  console.log(data);
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

function validatePeople(req, res, next) {
  const { data = {} } = req.body;
  const { people = null } = data;
  console.log(people);
  next();
}

async function list(req, res) {
  const reservations = await service.list();
  res.status(201).json({ data: reservations });
}

async function create(req, res) {
  const reservation = req.body.data;
  const createdReservation = await service.create(reservation);
  res.status(201).json({ data: createdReservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validatePeople,
    asyncErrorBoundary(create),
  ],
};
