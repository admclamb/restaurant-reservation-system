import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {
  today,
  time,
  getDayOfWeek,
  dateIsBeforeOtherDate,
} from "../utils/date-time";
import { hours } from "../utils/opening-hours";
import { OPENING_HOURS } from "../utils/opening-hours";
import ReservationForm from "../components/Form";
const NewReservation = () => {
  const initReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
    status: "booked",
  };

  const [reservation, setReservation] = useState(initReservation);
  const [reservationError, setReservationError] = useState(null);
  const [currentDay, setCurrentDay] = useState(today());
  const [currentTime, setCurrentTime] = useState(time());
  const history = useHistory();
  const handleChange = ({ target }) => {
    const { id } = target;
    // Ensure that the data type is a number
    if (target.type === "number") {
      setReservation({
        ...reservation,
        [id]: Number(target.value),
      });
    } else {
      setReservation({
        ...reservation,
        [id]: target.value,
      });
    }
    return;
  };

  const handleCancel = () => {
    setReservation(initReservation);
    history.push("/");
    return;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { reservation_date = "", reservation_time = "" } = reservation;
    const dateIsBeforeToday = dateIsBeforeOtherDate(
      reservation.reservation_date,
      today()
    );

    const day = await getDayOfWeek(reservation_date);
    if (!day) {
      return;
    }
    const opening = OPENING_HOURS[day.substring(0, 3)].open;
    const lastCall = OPENING_HOURS[day.substring(0, 3)].lastCall;

    // Check if reservation is during opening hours and before last call
    if (!(reservation_time > opening && reservation_time < lastCall)) {
      setReservationError({
        message: `The store opens ${day} at ${opening} and last call is ${lastCall}.`,
      });
      return;
    }
    // Check if reservation is today and if so if its later than current time
    if (reservation_date === today() && reservation_time < time()) {
      setReservationError({
        message: "The reservation is before the current time of today.",
      });
    }

    // if date is before tdoay
    if (dateIsBeforeToday) {
      setReservationError({ message: "This date is set before today." });
      return;
    }
    //lowercase string first three letters such as mon, tue, wed, etc.
    if (!OPENING_HOURS.storeIsOpen(day.substring(0, 3))) {
      setReservationError({ message: "The store is not open on that day" });
      return;
    }
    try {
      const abortController = new AbortController();
      const response = await createReservation(
        reservation,
        abortController.signal
      );
      setReservation(initReservation);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
  };
  return (
    <main className="container pt-3 mb-5">
      <h1>New Reservation</h1>
      <ErrorAlert error={reservationError} />
      <ReservationForm
        reservation={reservation}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
};

export default NewReservation;
