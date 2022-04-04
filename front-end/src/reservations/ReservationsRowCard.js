import { Link } from "react-router-dom";
import { formatAsDate, formatAsTime } from "../utils/date-time";

const ReservationsRowCard = ({ reservation, setCurrReservation_id }) => {
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
      className={"btn btn-main" + (status !== "booked" ? " disabled" : "")}
    >
      Seat
    </Link>
  );

  const editButton = (
    <Link
      to={`/reservations/${reservation_id}/edit`}
      className={"btn btn-main" + (status !== "booked" ? " disabled" : "")}
    >
      Edit
    </Link>
  );

  const cancelButton = (
    <button
      className={"btn btn-danger" + (status === "cancelled" ? " disabled" : "")}
      data-reservation-id-cancel={reservation.reservation_id}
      data-bs-toggle="modal"
      data-bs-target="#cancelOrderModal"
      onClick={() => setCurrReservation_id(reservation_id)}
    >
      Cancel
    </button>
  );
  return (
    <tr>
      <td>{people}</td>
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
      <td>{seatedButton}</td>
      <td>{editButton}</td>
      <td>{cancelButton}</td>
    </tr>
  );
};
export default ReservationsRowCard;
