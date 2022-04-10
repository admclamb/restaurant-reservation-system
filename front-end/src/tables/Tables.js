import TableCard from "./TableCard";
const Tables = ({ tables, setTablesError, loadDashboard }) => {
  if (Array.isArray(tables) && tables.length > 0) {
    const tablesList = tables.map((table) => {
      return (
        <TableCard
          table={table}
          key={table.table_id}
          setTablesError={setTablesError}
          loadDashboard={loadDashboard}
        />
      );
    });
    return (
      <section className="tables-list d-flex flex-column row container-fluid">
        {tablesList}
      </section>
    );
  }
  return <div className="alert alert-secondary">No Tables found</div>;
};

export default Tables;
