import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

const NewTable = () => {
  const history = useHistory();
  const initTable = {
    table_name: "",
    capacity: 1,
  };
  const [table, setTable] = useState(initTable);
  const [tableError, setTableError] = useState(null);
  const handleCancel = () => {
    history.push("/");
    return;
  };

  const handleChange = ({ target }) => {
    const { id } = target;

    setTable({
      ...table,
      [id]: target.type === "number" ? +target.value : target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { table_name, capacity } = table;
    // Check table length is at least two
    if (table_name.length < 2) {
      setTableError({
        message: "Table name must be at least 2 characters long",
      });
      return;
    }
    // Check capacity is at least one
    if (capacity < 1) {
      setTableError({
        message: "Table capacity must be at least 1 person",
      });
      return;
    }
    history.push("/dashboard");
    return;
  };

  console.log(table);
  console.log(tableError);
  return (
    <main className="container pt-3 mb-5">
      <h1>New Table</h1>
      <ErrorAlert error={tableError} />
      <form className="row g-3" id="new-table-form" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="table_name">Table Name</label>
          <input
            name="table_name"
            id="table_name"
            placeholder="Table Name"
            className="form-control"
            value={table.table_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="capacity">Capacity</label>
          <input
            name="capacity"
            id="capacity"
            placeholder="Capacity"
            type="number"
            className="form-control"
            value={table.capacity}
            onChange={handleChange}
          />
        </div>

        <div className="form-btns">
          <button className="btn btn-secondary me-3" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            form="new-table-form"
            value="Submit"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewTable;
