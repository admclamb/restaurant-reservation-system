import React, { useEffect, useState } from "react";
import {
  finishReservationTable,
  listReservations,
  listTables,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "./Dashboard.css";
import ChangeDate from "./ChangeDate";
import ReservationsTable from "./ReservationsTable";
import Tables from "./tables/Tables";
import { today, next, previous, formatAsDate } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import StaticBackdropModal from "../utils/StaticBackdropModal";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [currTable_id, setCurrTable_id] = useState();
  const [date, setDate] = useState(today());
  const query = useQuery();

  useEffect(() => {
    const queryDate = query.get("date");
    if (queryDate) {
      setDate(queryDate);
    }
  }, []);

  useEffect(() => loadDashboard(), [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables({ date }, abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  // Update tables and delete reservation when function is called in the tables row button
  function handleFinishTable() {
    const abortController = new AbortController();
    console.log(currTable_id);
    setTablesError(null);
    finishReservationTable(currTable_id)
      .then(loadDashboard)
      .catch(setTablesError);
  }

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
                <h3>{formatAsDate(date)}</h3>
              </div>
              <div className="day-toggles d-flex">
                <button
                  className="btn border"
                  onClick={() => setDate((currDate) => previous(currDate))}
                  id="decrement-date"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  className="btn border"
                  id="current-date"
                  onClick={() => setDate(today())}
                >
                  Today
                </button>
                <button
                  className="btn border"
                  id="increment-date"
                  onClick={() => setDate((currDate) => next(currDate))}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="right d-flex align-items-center">
              <p className="me-3">Date</p>
              <ChangeDate date={date} setDate={setDate} />
            </div>
          </div>
        </nav>
        <ErrorAlert error={reservationsError} />
        <ReservationsTable reservations={reservations} />
        <div className="mt-5">
          <ErrorAlert error={tablesError} />
          <Tables
            tables={tables}
            handleFinishTable={handleFinishTable}
            setCurrTable_id={setCurrTable_id}
          />
          {/*Handles finishing up a table in the tables table */}
          <StaticBackdropModal
            title={"Is this table ready to seat new guest?"}
            body={"This cannot be undone."}
            responseFunction={handleFinishTable}
          />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
