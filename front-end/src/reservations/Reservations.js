import ReservationCard from "./ReservationCard";
import "./Reservations.css";
const Reservations = ({ reservations, setErrors, loadDashboard }) => {
  if (Array.isArray(reservations) && reservations.length > 0) {
    const resrevationsFiltered = reservations.filter(
      (reservation) => reservation.status !== "cancelled"
    );
    if (resrevationsFiltered.length > 0) {
      const reservationsList =
        resrevationsFiltered
          .filter((reservation) => reservation.status !== "cancelled")
          .map((reservation) => {
            return (
              <ReservationCard
                reservation={reservation}
                key={reservation.reservation_id}
                setErrors={setErrors}
                loadDashboard={loadDashboard}
              />
            );
          }) || null;

      return (
        <section className="d-flex flex-column row container-fluid">
          {reservationsList}
        </section>
      );
    }
  }
  return <div className="alert alert-secondary">No reservations found</div>;
};

export default Reservations;
