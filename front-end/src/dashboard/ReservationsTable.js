import ReservationsTableRows from "./ReservationsTableRows";

const ReservationsTable = ({ reservations }) => {
  return (
    <table className="table container-fluid">
      <thead>
        <tr>
          <th scope="col">Size</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Mobile Number</th>
          <th scope="col">Time</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <ReservationsTableRows reservations={reservations} />
      </tbody>
    </table>
  );
};

export default ReservationsTable;
