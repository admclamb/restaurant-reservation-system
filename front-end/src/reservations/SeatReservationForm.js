import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { seatReservation } from "../utils/api";

const SeatReservationForm = ({ tables, setErrors }) => {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [table_id, setTable_id] = useState("");
  let tableOptions = null;
  if (Array.isArray(tables) && tables.length > 0) {
    tableOptions = tables.map((table) => {
      return (
        <option key={table.table_id} value={table.table_id}>
          {table.table_name} - {table.capacity}
        </option>
      );
    });
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const abortController = new AbortController();
      setErrors(null);
      await seatReservation(reservation_id, table_id, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      setErrors(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="seating-form">Select Table</label>
      <select
        className="form-select"
        id="table_id"
        name="table_id"
        onChange={({ target }) => setTable_id(target.value)}
        value={table_id}
      >
        <option value="">--select one--</option>
        {tableOptions}
      </select>
      <div className="form-buttons mt-4">
        <button
          className="btn btn-outline-dark me-3"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button className="btn btn-dark" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SeatReservationForm;
