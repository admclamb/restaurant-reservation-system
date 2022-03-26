import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateTableSeat } from "../utils/api";
import SeatForm from "./SeatForm";

const Seat = () => {
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState({});
  const [seatError, setSeatError] = useState(null);
  const { reservation_id } = useParams();

  useEffect(() => {
    setTables([]);
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setSeatError);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { table_id = "" } = table;
    const data = { reservation_id, table_id };
    updateTableSeat({ data }, abortController.signal).then(console.log);
  }, [table]);

  return (
    <>
      <header className="p-2">
        <h1>Seat</h1>
      </header>
      <main className="seat container">
        <ErrorAlert error={seatError} />
        <SeatForm tables={tables} setTable={setTable} />
      </main>
    </>
  );
};

export default Seat;
