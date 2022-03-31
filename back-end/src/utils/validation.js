const {
  getDayOfWeek,
  today,
  time,
  dateIsBeforeOtherDate,
} = require("../utils/date-time");

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
