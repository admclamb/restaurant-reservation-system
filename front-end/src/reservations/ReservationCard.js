import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";
import "./ReservationCard.css";

const ReservationCard = ({ reservation, setErrors, loadDashboard }) => {
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

  const handleCancel = () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      updateReservationStatus(
        reservation_id,
        "cancelled",
        abortController.signal
      )
        .then(loadDashboard)
        .catch(setErrors);
    }
  };
  // const statusColor = status === "booked" ? "text-success" : "";
  const seatedButton = (
    <Link
      to={`/reservations/${reservation_id}/seat`}
      className={"btn btn-main" + (status !== "booked" ? " d-none" : "")}
    >
      Seat
    </Link>
  );

  const editButton = (
    <Link
      to={`/reservations/${reservation_id}/edit`}
      className={"btn btn-main" + (status !== "booked" ? " d-none" : "")}
    >
      <i className="fa-solid fa-pen-to-square"></i> Edit
    </Link>
  );

  const cancelButton = (
    <button
      className={"btn btn-danger" + (status !== "booked" ? " d-none" : "")}
      data-reservation-id-cancel={reservation_id}
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
  return (
    <article className="reservation-card row border rounded p-2">
      <div className="col-1 d-flex align-items-center">
        <span
          className="badge rounded-pill bg-dark status"
          data-reservation-id-status={reservation_id}
        >
          {status}
        </span>
      </div>

      <div className="col-4">
        <p>
          {last_name} {first_name}
        </p>
        <div className="capcity-phone-number d-flex mt-1">
          <p className="capacity me-4">
            <i className="fa-solid fa-users me-2"></i>
            {people}
          </p>
          <p>
            <i className="fa-solid fa-phone-flip"></i>
            {mobile_number}
          </p>
        </div>
      </div>

      <div className="col-3">
        <p>{reservation_date}</p>
        <p>{reservation_time}</p>
      </div>
      {status === "booked" ? (
        <div className="buttons d-flex justify-content-between align-items-center col-4">
          {seatedButton}
          {editButton}
          {cancelButton}
        </div>
      ) : (
        ""
      )}
    </article>
  );
};

export default ReservationCard;
