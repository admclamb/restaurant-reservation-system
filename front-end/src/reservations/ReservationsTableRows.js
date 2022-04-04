import ReservationsRowCard from "./ReservationsRowCard";

const ReservationsTableRows = ({ reservations, setCurrReservation_id }) => {
  if (Array.isArray(reservations) && reservations.length > 0) {
    const tableRowData = reservations.map((reservation) => {
      return (
        <ReservationsRowCard
          key={reservation.reservation_id}
          reservation={reservation}
          setCurrReservation_id={setCurrReservation_id}
        />
      );
    });

    return <>{tableRowData}</>;
  }

  return (
    <tr>
      <td>No reservations found</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default ReservationsTableRows;
