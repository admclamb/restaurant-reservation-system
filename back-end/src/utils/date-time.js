const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instance.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

/**
 * Today's date as YYYY-MM-DD.
 * @returns {*}
 *  the today's date formatted as YYYY-MM-DD
 */
function today() {
  return asDateString(new Date());
}

/**
 * @returns {*}
 * the current time format in HH:MM
 */
function time() {
  const today = new Date();
  return today.getHours() + ":" + today.getMinutes();
}

/**
 * @param date as YYYY-MM-DD.
 * @returns day of the week
 */
function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();

  return isNaN(dayOfWeek)
    ? null
    : [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ][dayOfWeek];
}

/**
 * @params 1st date string and 2nd date string in format YYYY-MM-DD
 * checks if first param date is before second param date
 * @returns true or false
 */
function dateIsBeforeOtherDate(date1, date2) {
  const date1Els = date1.split("-");
  const date2Els = date2.split("-");
  for (let i = 0; i < date1Els.length; i++) {
    if (+date1Els[i] < +date2Els[i]) {
      return true;
    }
    if (+date1Els[i] > +date2Els[i]) {
      return false;
    }
  }
  return null;
}

module.exports = {
  today,
  time,
  getDayOfWeek,
  dateIsBeforeOtherDate,
};
