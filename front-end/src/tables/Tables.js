import TablesTableRows from "./TablesTableRows";

const Tables = ({ tables, setCurrTable_id }) => {
  return (
    <>
      <table className="table container-fluid">
        <thead>
          <tr className="bg-main--light">
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Free/Occupied</th>
            <th scope="col">Finished Meal</th>
          </tr>
        </thead>
        <tbody>
          <TablesTableRows tables={tables} setCurrTable_id={setCurrTable_id} />
        </tbody>
      </table>
    </>
  );
};

export default Tables;