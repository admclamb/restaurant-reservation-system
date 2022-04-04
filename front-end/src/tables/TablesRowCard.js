const TablesRowCard = ({ table, setCurrTable_id }) => {
  const { table_name, capacity, occupied } = table;
  return (
    <tr>
      <td scope="row">{table_name}</td>
      <td>{capacity}</td>
      <td data-table-id-status={table.table_id}>
        {occupied ? "Occupied" : "Free"}
      </td>
      <td>
        {/* button trigger for finish modal */}
        {/**
         * onClick sends to modal for confirming then to handleFinishTable in dashboard
         */}
        <button
          className="btn btn-main"
          data-table-id-finish={table.table_id}
          data-bs-toggle="modal"
          data-bs-target="#finishTable"
          onClick={() => setCurrTable_id(table.table_id)}
        >
          Finished
        </button>
      </td>
    </tr>
  );
};

export default TablesRowCard;