import { useEffect, useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { listTables } from "../../utils/api";
import SeatForm from "./SeatForm";

const Seat = () => {
  const [tables, setTables] = useState([]);
  const [seatError, setSeatError] = useState(null);

  useEffect(() => {
    setTables([]);
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setSeatError);
  }, []);

  return (
    <>
      <header className="p-2 container">
        <h1>Seat</h1>
      </header>
      <main className="seat container">
        <ErrorAlert error={seatError} />
        <SeatForm tables={tables} />
      </main>
    </>
  );
};

export default Seat;
