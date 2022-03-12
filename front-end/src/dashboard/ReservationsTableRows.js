import TableRowCard from "./TableRowCard";

const ReservationsTableRows = ({ reservations }) => {
  if (Array.isArray(reservations) && reservations.length > 0) {
    const tableRowData = reservations.map((reservation, index) => {
      return <TableRowCard key={index} reservation={reservation} />;
    });

    return <>{tableRowData}</>;
  }

  return <p>No table data</p>;
};

export default ReservationsTableRows;
