const TablesRowCard = ({ table, handleFinishTable, setCurrTable_id }) => {
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
        <button
          className="btn btn-success"
          data-table-id-finish={table.table_id}
          // onClick={handleFinishTable}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => setCurrTable_id(table.table_id)}
        >
          Finished
        </button>
      </td>
    </tr>
  );
};

export default TablesRowCard;
