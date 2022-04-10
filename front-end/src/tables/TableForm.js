const TableForm = ({ table, setTable, handleSubmit, history }) => {
  const handleChange = ({ target }) => {
    const { id } = target;
    setTable({
      ...table,
      [id]: target.type === "number" ? +target.value : target.value,
    });
  };
  return (
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
        <button
          className="btn btn-secondary me-3"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button
          className="btn btn-main"
          type="submit"
          form="new-table-form"
          value="Submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default TableForm;
