import { useHistory } from "react-router-dom";
import TableOption from "./TableCard";

const SeatForm = ({ tables, setTable }) => {
  const history = useHistory();

  const handleCancel = () => {
    history.push("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTable(event.target.value);
    history.push("/");
  };

  if (Array.isArray(tables) && tables.length > 0) {
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
  }
  return null;
};
export default SeatForm;
