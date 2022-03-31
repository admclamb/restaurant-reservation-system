const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/has-properties");
const hasOnlyValidProperties = require("../utils/has-only-valid-properties");
const OPENING_HOURS = require("../utils/opening-hours");
const {
  getDayOfWeek,
  today,
  time,
  dateIsBeforeOtherDate,
} = require("../utils/date-time");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
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

const hasRequiredProperties = hasProperties(
  ...[
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ]
);
const has_only_valid_properties = hasOnlyValidProperties(...VALID_PROPERTIES);
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

function validateReservationTime(req, res, next) {
  const { data = {} } = res.locals;
  const { reservation_time = null } = data;
  const { reservation_date = null } = data;
  const day = getDayOfWeek(reservation_date);

  // Get opening and last call hours based on the day
  const opening = OPENING_HOURS[day.toLowerCase().substring(0, 3)].open;
  const lastCall = OPENING_HOURS[day.toLowerCase().substring(0, 3)].lastCall;
  // Check if rservation is during opening hours and before last call
  if (!(reservation_time > opening && reservation_time < lastCall)) {
    return next({
      status: 400,
      message: "not open",
    });
  }
  // Check if reservation is today and if so if its later than current time
  if (reservation_date === today() && reservation_time < time()) {
    return next({
      status: 400,
      message: "The reservation is before the current time of today.",
    });
  }
  next();
}

function validateStatus(req, res, next) {
  const { data = {} } = req.body;
  const { status = null } = data;
  if (status) {
    if (status === "booked") {
      return next();
    }
    return next({ status: 400, message: status });
  }
  next();
}

const VALID_STATUS_PROPERTIES = ["booked", "seated", "finished", "cancelled"];
// Validate update status
function validateStatusUpdate(req, res, next) {
  const { status = null } = req.body.data;
  if (status && VALID_STATUS_PROPERTIES.includes(status)) {
    return next();
  }
  next({ status: 400, message: "unknown" });
}

// Satus cannot be curretnly finished before updating
function validateCurrentStatus(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({ status: 400, message: "finished" });
  }
  next();
}

function validateDate(req, res, next) {
  const { data = {} } = req.body;
  const { reservation_date = null } = data;
  if (validation.isDate(reservation_date)) {
    res.locals.data = data;
    return next();
  }
  next({
    status: 400,
    message: "reservation_date",
  });
}

function dateIsNotBeforeToday(req, res, next) {
  const { data = {} } = res.locals;
  const { reservation_date } = data;
  if (!dateIsBeforeOtherDate(reservation_date, today())) {
    return next();
  }
  next({
    status: 400,
    message: "future",
  });
}

function storeIsOpen(req, res, next) {
  const { data = {} } = res.locals;
  const { reservation_date } = data;
  const dayOfWeek = getDayOfWeek(reservation_date);
  if (OPENING_HOURS.storeIsOpen(dayOfWeek.toLowerCase().substring(0, 3))) {
    return next();
  }
  next({
    status: 400,
    message: "closed",
  });
}

async function list(req, res) {
  // If Date is query parameter or mobile number is query parameter,
  // filter the correct information
  const { date = "", mobile_number = "" } = req.query;
  console.log(mobile_number);
  const data = date
    ? await service.listByDate(date)
    : mobile_number
    ? await service.listByNumber(mobile_number)
    : await service.list();
  console.log(data);

  const dataNotFinished = data.filter(
    (reservation) => reservation.status !== "finished"
  );
  console.log(dataNotFinished);
  const sortedData = dataNotFinished.sort((firstEl, secEl) => {
    return firstEl.reservation_time.localeCompare(secEl.reservation_time);
  });
  res.status(200).json({ data: sortedData });
}

async function create(req, res) {
  const { data = {} } = req.body;
  const createdReservation = await service.create(data);
  res.status(201).json({ data: createdReservation });
}

async function reservationExist(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  console.log(reservation);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: reservation_id });
}

async function read(req, res, next) {
  const { reservation } = res.locals;
  res.status(200).json({ data: reservation });
}

const hasRequiredUpdateProperties = hasProperties(
  ...[
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ]
);
const has_only_valid_update_properties = hasOnlyValidProperties(
  ...[
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
    "status",
    "reservation_id",
    "created_at",
    "updated_at",
  ]
);

async function update(req, res, next) {
  try {
    const updatedReservation = {
      ...req.body.data,
      reservation_id: res.locals.reservation.reservation_id,
    };
    const data = await service.update(updatedReservation);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  const { reservation } = res.locals;
  const { status } = req.body.data;
  const updatedReservation = {
    ...reservation,
    status,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    has_only_valid_properties,
    hasRequiredProperties,
    validateDate,
    storeIsOpen,
    dateIsNotBeforeToday,
    validateTime,
    validatePeople,
    validateReservationTime,
    validateStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExist), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExist),
    hasRequiredUpdateProperties,
    has_only_valid_update_properties,
    validateDate,
    storeIsOpen,
    dateIsNotBeforeToday,
    validateTime,
    validatePeople,
    validateReservationTime,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExist),
    validateCurrentStatus,
    validateStatusUpdate,
    asyncErrorBoundary(updateStatus),
  ],
};
