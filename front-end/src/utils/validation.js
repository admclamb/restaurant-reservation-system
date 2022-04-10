import { today, dateIsBeforeOtherDate, getDayOfWeek, time } from "./date-time";
import { OPENING_HOURS } from "./opening-hours";
export function validateNewTable(table) {
  const { table_name = null, capacity = null } = table;
  if (!table_name) {
    return { message: "Table must have a name" };
  }

  if (!capacity) {
    return { message: "Capacity must have a value" };
  }
  if (table_name.length < 2) {
    return { message: "Table name must be at least 2 characters long" };
  }
  if (capacity < 1) {
    return { message: "Table capacity must be at least 1 personse" };
  }
  return null;
}

export async function validateNewReservation(reservation) {
  const { reservation_date = "", reservation_time = "" } = reservation;
  const dateIsBeforeToday = dateIsBeforeOtherDate(reservation_date, today());

  const day = await getDayOfWeek(reservation_date);
  if (!day) return { message: "No day was found from reservation date" };
  const opening = OPENING_HOURS[day.substring(0, 3)].open;
  const lastCall = OPENING_HOURS[day.substring(0, 3)].lastCall;
  // Check if reservation is during opening hours and before last call
  if (!(reservation_time > opening && reservation_time < lastCall)) {
    return {
      message: `The store opens ${day} at ${opening} and last call is ${lastCall}.`,
    };
  }
  // Check if reservation is today and if so if its later than current time
  if (reservation_date === today() && reservation_time < time()) {
    return { message: "The reservation is before the current time of today." };
  }
  // if date is before tdoay
  if (dateIsBeforeToday) {
    return { message: "This date is set before today." };
  }
  //lowercase string first three letters such as mon, tue, wed, etc.
  if (!OPENING_HOURS.storeIsOpen(day.substring(0, 3))) {
    return { message: "The store is not open on that day" };
  }
  return null;
}
