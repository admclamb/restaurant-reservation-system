import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "./Dashboard.css";
import ChangeDate from "./ChangeDate";

import ReservationsTable from "./ReservationsTable";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(today());
  const query = useQuery();

  useEffect(() => {
    const queryDate = query.get("date");
    if (queryDate) {
      setDate(queryDate);
    }
  }, []);
  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleDateChange = ({ target }) => {
    const { id } = target;
    if (id === "decrement-date") {
    }
  };
  return (
    <>
      <header className="p-2">
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date</h4>
        </div>
      </header>
      <main className="Dashboard">
        <nav className=" dashboard-nav dashboard-controls">
          <div className="container-fluid d-flex justify-content-between align-items-center pt-3 pb-3">
            <div className="left d-flex">
              <div className="date me-4">
                <h3>{date}</h3>
              </div>
              <div className="day-toggles d-flex">
                <button
                  className="btn border"
                  onClick={handleDateChange}
                  id="decrement-date"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="btn border" id="current-date">
                  Today
                </button>
                <button className="btn border" id="increment-date">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="right d-flex align-items-center">
              <p className="me-3">Date</p>
              <ChangeDate />
            </div>
          </div>
        </nav>
        <ErrorAlert error={reservationsError} />
        <ReservationsTable reservations={reservations} />
      </main>
    </>
  );
}

export default Dashboard;
