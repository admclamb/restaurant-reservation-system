const TableOption = ({ table }) => {
  return (
    <option name="table_id" value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  );
};
export default TableOption;
