import TablesRowCard from "./TablesRowCard";

const TablesTableRows = ({ tables, handleFinishTable, setCurrTable_id }) => {
  if (Array.isArray(tables) && tables.length > 0) {
    const tableRowData = tables.map((table, index) => {
      return (
        <TablesRowCard
          table={table}
          key={table.table_id}
          handleFinishTable={handleFinishTable}
          setCurrTable_id={setCurrTable_id}
        />
      );
    });
    return <>{tableRowData}</>;
  }
  return (
    <tr>
      <td>No Tables...</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default TablesTableRows;
