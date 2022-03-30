import { Link } from "react-router-dom";
import { formatAsDate, formatAsTime } from "../utils/date-time";

const ReservationsRowCard = ({ reservation }) => {
  if (!reservation) return null;
  const {
    people,
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    reservation_date,
    reservation_id,
    status = "booked",
  } = reservation;

  const statusColor = status === "booked" ? "text-success" : "";

  const seatedButton = (
    <Link
      to={`/reservations/${reservation_id}/seat`}
      className="btn btn-success"
    >
      Seat
    </Link>
  );
  return (
    <tr>
      <td scope="row">{people}</td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{mobile_number}</td>
      <td>{formatAsTime(reservation_time)}</td>
      <td>{formatAsDate(reservation_date)}</td>
      <td
        className={statusColor}
        data-reservation-id-status={reservation.reservation_id}
      >
        {status}
      </td>
      <td>{status === "booked" ? seatedButton : null}</td>
    </tr>
  );
};
export default ReservationsRowCard;
