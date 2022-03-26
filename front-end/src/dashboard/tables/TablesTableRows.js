import TablesRowCard from "./TablesRowCard";

const TablesTableRows = ({ tables }) => {
  console.log(tables);
  if (Array.isArray(tables) && tables.length > 0) {
    const tableRowData = tables.map((table, index) => {
      return <TablesRowCard table={table} key={index} />;
    });
    return <>{tableRowData}</>;
  }
  return (
    <tr>
      <td>No Tables...</td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default TablesTableRows;
