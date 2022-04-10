import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardNav from "./DashboardNav";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables({}, abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <>
      <header className="pt-2 container-fluid">
        <h1>Dashboard</h1>
        <DashboardNav date={date} setDate={setDate} />
      </header>
      <main className="container-fluid">
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations</h4>
        </div>
        <ErrorAlert error={reservationsError} />
        <Reservations
          reservations={reservations}
          setErrors={setReservationsError}
          loadDashboard={loadDashboard}
        />
        <div className="d-md-flex  mt-3 mb-3">
          <h4 className="mb-0">Tables</h4>
        </div>
        <ErrorAlert error={tablesError} />
        <Tables
          tables={tables}
          setTablesError={setTablesError}
          loadDashboard={loadDashboard}
        />
      </main>
    </>
  );
}

export default Dashboard;
