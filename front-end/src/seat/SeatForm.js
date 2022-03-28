import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TableOption from "./TableOption";
import { updateTableSeat } from "../utils/api";
const SeatForm = ({ tables }) => {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [table_id, setTable_id] = useState("");

  // Check if tables is iterable or not
  if (
    (Array.isArray(tables) && tables.length === 0) ||
    !Array.isArray(tables)
  ) {
    return null;
  }

  const handleCancel = () => {
    history.push("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const data = { reservation_id, table_id };
    updateTableSeat(data, abortController.signal).then(console.log);
  };

  const tablesOptions = tables.map((table, index) => {
    return <TableOption table={table} key={index} />;
  });
  return (
    <form onSubmit={handleSubmit} id="seating-form">
      <label htmlFor="table-select">Select Table</label>
      <select
        className="form-select"
        aria-label="Table selection"
        id="table-select"
        value={table_id}
        onChange={({ target }) => setTable_id(target.value)}
      >
        {tablesOptions}
      </select>
      <div className="form-buttons mt-4">
        <button className="btn btn-outline-dark me-3" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="btn btn-dark"
          type="submit"
          form="seating-form"
          value="Submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default SeatForm;
