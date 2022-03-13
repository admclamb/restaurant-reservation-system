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

// Validation object
const validation = {
  isNotEmpty: function (str) {
    const pattern = /\S+/;
    return pattern.test(str); //returns boolean value
  },
  isNumber: function (str) {
    const pattern = /^\d+$/;
    return pattern.test(str); //returns boolean value
  },
  isDate: function (str) {
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return pattern.test(str); //returns boolean value
  },
  isTime: function (str) {
    const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return pattern.test(str);
  },
};

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
function validatePeople(req, res, next) {
  const { data = {} } = req.body;
  const { people = null } = data;
  if (people === "0" || people === 0) {
    next({
      status: 400,
      message: `Error, amount of people must be greater than zero.`,
    });
  }
  if (!validation.isNumber(people)) {
    next({
      status: 400,
      message: "Error, amount of people must be a number.",
    });
  }
  next();
}

function validateTime(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_time = null } = data;
  if (!validation.isTime(reservation_time)) {
    next({
      status: 400,
      message: "Error, reservation time must be a time",
    });
  }
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
    validateTime,
    asyncErrorBoundary(create),
  ],
};
