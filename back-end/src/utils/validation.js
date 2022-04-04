const OPENING_HOURS = require("./opening-hours");
const {
  getDayOfWeek,
  today,
  time,
  dateIsBeforeOtherDate,
} = require("./date-time");
const validation = {
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
  const opening = OPENING_HOURS[day].open;
  const lastCall = OPENING_HOURS[day].lastCall;
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
  if (OPENING_HOURS.storeIsOpen(dayOfWeek)) {
    return next();
  }
  next({
    status: 400,
    message: "closed",
  });
}

module.exports = {
  validateDate,
  storeIsOpen,
  dateIsNotBeforeToday,
  validateTime,
  validatePeople,
  validateReservationTime,
  validateStatus,
  validateCurrentStatus,
  validateStatusUpdate,
};
