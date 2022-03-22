import TableRowCard from "./TableRowCard";

const ReservationsTableRows = ({ reservations }) => {
  if (Array.isArray(reservations) && reservations.length > 0) {
    const tableRowData = reservations.map((reservation, index) => {
      return <TableRowCard key={index} reservation={reservation} />;
    });

    return <>{tableRowData}</>;
  }

  return (
    <tr>
      <td>No Resrevations Today...</td>
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
