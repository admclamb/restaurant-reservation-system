import ReservationsTableRows from "./ReservationsTableRows";

const ReservationsTable = ({ reservations, setCurrReservation_id }) => {
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
          <th scope="col">Status</th>
          <th scope="col">Seat</th>
          <th scope="col">Edit</th>
          <th scope="col">Cancel</th>
        </tr>
      </thead>
      <tbody>
        <ReservationsTableRows
          reservations={reservations}
          setCurrReservation_id={setCurrReservation_id}
        />
      </tbody>
    </table>
  );
};

export default ReservationsTable;
