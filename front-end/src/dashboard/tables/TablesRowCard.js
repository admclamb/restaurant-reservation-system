const TablesRowCard = ({ table }) => {
  const { table_name, capacity, occupied } = table;
  return (
    <tr>
      <td scope="row">{table_name}</td>
      <td>{capacity}</td>
      <th scope="row" data-table-id-status={table.table_id}>
        {occupied ? "Occupied" : "Free"}
      </th>
      {/* <th scope="row" data-table-id-status=table.table_id></th> */}
    </tr>
  );
};

export default TablesRowCard;
