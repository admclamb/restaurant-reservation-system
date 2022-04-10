import { finishTable } from "../utils/api";
import "./TableCard.css";

const TableCard = ({ table, setTablesError, loadDashboard }) => {
  const { table_name, capacity, reservation_id, table_id } = table;
  const status = reservation_id ? "Occupied" : "Free";
  const handleFinish = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setTablesError(null);
      finishTable(table_id, abortController.signal)
        .then(loadDashboard)
        .catch(setTablesError);
    }
  };

  const finishButton = (
    <button
      className={"btn btn-secondary " + (!reservation_id ? "d-none" : "")}
      data-table-id-finish={table_id}
      onClick={handleFinish}
    >
      <i className="fa-solid fa-check"></i> Finish
    </button>
  );
  return (
    <article className="table-card row border rounded p-2">
      <div className="col-1 d-flex align-items-center">
        <span
          className="badge rounded-pill bg-dark status"
          data-table-id-status={table_id}
        >
          {status}
        </span>
      </div>
      <div className="table-name col-3">
        <p>{table_name}</p>
      </div>
      <div className="capacity col-3">
        <p>{capacity} Top</p>
      </div>
      <div className="buttons col-3">{finishButton}</div>
    </article>
  );
};

export default TableCard;
