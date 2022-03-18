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
  isNumber: function (value) {
    const pattern = /^\d+$/;
    return pattern.test(value) && typeof value === "number"; //returns boolean value
  },
  isDate: function (str) {
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return pattern.test(str); //returns boolean value
  },
  isTime: function (str) {
    const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return pattern.test(str); //return boolean value
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
  if (people > 0 && validation.isNumber(people)) {
    return next();
  }
  next({
    status: 400,
    message: "people",
  });
}

function validateTime(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_time = null } = data;
  if (!validation.isTime(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time",
    });
  }
  next();
}

function validateDate(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_date = null } = data;
  if (validation.isDate(reservation_date)) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date",
  });
}

function dateIsNotBeforeToday(req, res, next) {
  next();
}

function storeIsOpen(req, res, next) {
  next();
}

async function list(req, res) {
  const { date = "" } = req.query;
  const data = date ? await service.listByDate(date) : await service.list();
  const sortedData = data.sort((firstEl, secEl) => {
    return firstEl.reservation_time.localeCompare(secEl.reservation_time);
  });
  res.status(200).json({ data: sortedData });
}

async function create(req, res) {
  const { data = {} } = req.body;
  const reservation = data;
  const createdReservation = await service.create(reservation);
  res.status(201).json({ data: createdReservation });
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validateDate,
    storeIsOpen,
    dateIsNotBeforeToday,
    validateTime,
    validatePeople,
    asyncErrorBoundary(create),
  ],
};
