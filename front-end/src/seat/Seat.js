import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation } from "../utils/api";

const Seat = () => {
  const [table, setTable] = useState({});
  const [tableError, setTableError] = useState(null);
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readtable(reservation_id).then(setTable).catch(settableError);
  }, [table_id]);

  return (
    <>
      <header className="p-2">
        <h1>Seat</h1>
      </header>
      <main className="seat">
        <ErrorAlert error={tableError} />
        <select className="form-select" name="table_id">
          <option>{table.table_name}</option>
          <option>{table.capacity}</option>
        </select>
      </main>
    </>
  );
};

export default Seat;
