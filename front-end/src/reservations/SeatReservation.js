import { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";
import SeatReservationForm from "./SeatReservationForm";

const SeatReservation = () => {
  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setTables([]);
    const abortController = new AbortController();
    listTables({}, abortController.signal).then(setTables).catch(setErrors);
    return () => abortController.abort();
  }, []);

  return (
    <>
      <header className="pt-3 mb-3 container">
        <h1>Seat Reservation</h1>
      </header>
      <main className="container">
        <ErrorAlert error={errors} />
        <SeatReservationForm tables={tables} setErrors={setErrors} />
      </main>
    </>
  );
};
export default SeatReservation;
