import { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import { validateNewReservation } from "../utils/validation";

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
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const validationErrors = await validateNewReservation(reservation);
      if (!validationErrors) {
        const abortController = new AbortController();
        await createReservation(reservation, abortController.signal);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      } else {
        setErrors(validationErrors);
      }
    } catch (error) {
      setErrors(error);
    }
  };
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <>
      <header className="container-fluid">
        <h1 className="mt-3 mb-3">New Reservation</h1>
      </header>
      <main className="container-fluid">
        <ErrorAlert error={errors} />
        <ReservationForm
          reservation={reservation}
          setReservation={setReservation}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </main>
    </>
  );
};

export default NewReservation;
