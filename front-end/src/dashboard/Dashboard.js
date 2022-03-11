import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  console.log(reservations);
  return (
    <>
      <header>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date</h4>
        </div>
      </header>
      <main className="Dashboard">
        <nav className="dashboard-controls d-flex justify-content-between">
          <div className="day-toggles">
            <button className="btn border">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn border">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div className="date-range">
            <p>Date Range</p>
          </div>
        </nav>
        <ErrorAlert error={reservationsError} />
        {JSON.stringify(reservations)}
      </main>
    </>
  );
}

export default Dashboard;
