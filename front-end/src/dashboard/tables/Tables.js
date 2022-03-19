import TablesTableRows from "./TablesTableRows";

const Tables = () => {
  return (
    <table className="table container-fluid">
      <thead>
        <tr>
          <th scope="col">Table Name</th>
          <th scope="col">Capacity</th>
          <th scope="col">Free/Occupied</th>
        </tr>
      </thead>
      <tbody>
        <TablesTableRows />
      </tbody>
    </table>
  );
};

export default Tables;
