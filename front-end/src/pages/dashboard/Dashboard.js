import React, { useEffect, useState } from "react";
import {
  finishReservationTable,
  listReservations,
  listTables,
  updateReservationStatus,
} from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import "./Dashboard.css";
import ReservationsTable from "../../reservations/ReservationsTable";
import Tables from "../../tables/Tables";
import { today } from "../../utils/date-time";
import useQuery from "../../utils/useQuery";
import StaticBackdropModal from "../../utils/StaticBackdropModal";
import DashboardNavbar from "./DashboardNavbar";
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [date, setDate] = useState(today());
  // Current values being passed through seperate parts of the applications
  const [currTable_id, setCurrTable_id] = useState("");
  const [currReservation_id, setCurrReservation_id] = useState("");

  const query = useQuery();

  useEffect(() => {
    const queryDate = query.get("date");
    if (queryDate) {
      setDate(queryDate);
    }
  }, [query]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .catch(setReservationsError)
      .then(setReservations);
    listTables({}, abortController.signal)
      .catch(setTablesError)
      .then(setTables);
    return () => abortController.abort();
  }

  // Update tables and delete reservation when function is called in the tables row button
  function handleFinishTable() {
    const abortController = new AbortController();
    setTablesError(null);
    finishReservationTable(currTable_id, abortController.signal)
      .then(loadDashboard)
      .catch(setTablesError);
  }

  // Cancels reservation
  function cancelReservation() {
    const abortController = new AbortController();
    setReservationsError(null);
    updateReservationStatus(
      currReservation_id,
      "cancelled",
      abortController.signal
    )
      .then(loadDashboard)
      .catch(setReservationsError);
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
        <DashboardNavbar date={date} setDate={setDate} />
        <ErrorAlert error={reservationsError} />
        <ReservationsTable
          reservations={reservations}
          setCurrReservation_id={setCurrReservation_id}
        />
        <div className="mt-5">
          <ErrorAlert error={tablesError} />
          <Tables
            tables={tables}
            handleFinishTable={handleFinishTable}
            setCurrTable_id={setCurrTable_id}
          />
          {/* Modals for different parts of the applications */}

          {/*Handles finishing up a table in the tables table */}
          <StaticBackdropModal
            title={
              "Is this table ready to seat new guests? This cannot be undone."
            }
            body={""}
            id={"finishTable"}
            responseFunction={handleFinishTable}
          />
          {/*Handles canceling a reservation */}
          <StaticBackdropModal
            title={"Do you want to cancel this reservation?"}
            body={"This cannot be undone."}
            id={"cancelOrderModal"}
            responseFunction={cancelReservation}
          />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
