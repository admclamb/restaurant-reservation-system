import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import {
  dateIsBeforeOtherDate,
  today,
  time,
  getDayOfWeek,
} from "../utils/date-time";
import { OPENING_HOURS } from "../utils/opening-hours";
const Edit = () => {
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
        const response = await readReservation(reservation_id);
        setReservation(response);
        setReservationError(null);
      } catch (error) {
        setReservationError(error);
      }
    }
    getReservation();
  }, [reservation_id]);
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
      const opening = OPENING_HOURS[day.toLowerCase().substring(0, 3)].open;
      const lastCall =
        OPENING_HOURS[day.toLowerCase().substring(0, 3)].lastCall;

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
      if (!OPENING_HOURS.storeIsOpen(day.toLowerCase().substring(0, 3))) {
        setReservationError({ message: "The store is not open on that day" });
        return;
      }
      event.preventDefault();
      history.goBack();
      const abortController = new AbortController();
      const response = await updateReservation(
        reservation,
        reservation_id,
        abortController.signal
      );
    } catch (error) {
      setReservationError({ message: error });
    }
  };
  return (
    <>
      <main className="container pt-3 mb-5">
        <h1>Edit Reservation</h1>
        <ErrorAlert error={reservationError} />
        <form
          id="edit-reservation-form"
          className="row g-3"
          onSubmit={handleSubmit}
        >
          <div className="col-md-6">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              className="form-control"
              placeholder="First Name"
              aria-describedby="firstName"
              value={reservation.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              className="form-control"
              placeholder="Last Name"
              aria-describedby="lastName"
              value={reservation.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              id="mobile_number"
              className="form-control"
              type="tel"
              placeholder="Mobile Number"
              arira-aria-describedby="mobileNumber"
              value={reservation.mobile_number}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="reservation_date">Date of Reservation</label>
            <input
              id="reservation_date"
              className="form-control"
              type="date"
              placeholder="Reservation Date"
              aria-describedby="date"
              value={reservation.reservation_date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="reservation_time">Time of Reservation</label>
            <input
              id="reservation_time"
              className="form-control"
              type="time"
              placeholder="Reservation Time"
              value={reservation.reservation_time}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="people">Party Size</label>
            <input
              type="number"
              id="people"
              className="form-control"
              placeholder="Number of people"
              aria-describedby="numberOfPeople"
              value={reservation.people}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="status">Status</label>
            <input
              id="status"
              className="form-control"
              placeholder="Reservation Status"
              value={reservation.status}
              onChange={handleChange}
            />
          </div>
          <div className="form-btns">
            <button className="btn btn-secondary me-3" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="btn btn-main"
              type="submit"
              form="edit-reservation-form"
              value="Submit"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Edit;
