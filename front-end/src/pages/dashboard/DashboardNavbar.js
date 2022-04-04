import { formatAsDate, previous, next, today } from "../../utils/date-time";
import ChangeDate from "./ChangeDate";
const DashboardNavbar = ({ date, setDate }) => {
  return (
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
  );
};

export default DashboardNavbar;
