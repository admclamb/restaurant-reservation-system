import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { readReservation, updateReservation } from "../utils/api";
import {
  dateIsBeforeOtherDate,
  today,
  time,
  getDayOfWeek,
} from "../utils/date-time";
import { OPENING_HOURS } from "../utils/opening-hours";
const EditReservation = () => {
  const initReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
    status: "",
  };
  const [reservation, setReservation] = useState(initReservation);
  const [reservationError, setReservationError] = useState(null);

  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    async function getReservation() {
      try {
        const abortController = new AbortController();
        const response = await readReservation(
          reservation_id,
          abortController.signal
        );
        setReservation(response);
        setReservationError(null);
      } catch (error) {
        setReservationError(error);
      }
    }
    getReservation();
  }, [reservation_id]);

  const handleCancel = () => {
    setReservation();
    history.push("/");
    return;
  };

  const handleSubmit = async (event) => {
    try {
      const { reservation_date = "", reservation_time = "" } = reservation;
      const dateIsBeforeToday = dateIsBeforeOtherDate(
        reservation.reservation_date,
        today()
      );

      const day = getDayOfWeek(reservation_date);
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
      event.preventDefault();
      const abortController = new AbortController();
      await updateReservation(
        reservation,
        reservation_id,
        abortController.signal
      );
      history.push(`/dashboard?date=${reservation_date}`);
    } catch (error) {
      setReservationError({ message: error });
    }
  };
  return (
    <>
      <main className="container pt-3 mb-5">
        <h1>Edit Reservation</h1>
        <ErrorAlert error={reservationError} />
        <ReservationForm
          reservation={reservation}
          setReservation={setReservation}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </main>
    </>
  );
};

export default EditReservation;
