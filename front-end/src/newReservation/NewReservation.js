import React from "react";

const NewReservation = () => {
  return (
    <>
      <h1>New Reservation</h1>
      <form>
        <div className="form-group">
          <label htmlFor="first_name">
            First Name
            <input
              name="first_name"
              id="first_name"
              className="form-control"
              placeholder="First name"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">
            Last Name
            <input
              name="last_name"
              id="last_name"
              className="form-control"
              placeholder="Last name"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">
            Mobile Number
            <input
              name="mobile_number"
              id="mobile_number"
              className="form-control"
              placeholder="Mobile number"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">
            Date of Reservation
            <input
              name="reservation_date"
              id="reservation_date"
              className="form-control"
              placeholder="Reservation date"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">
            Time of Reservation
            <input
              name="reservation_time"
              id="reservatoin_time"
              className="form-control"
              placeholder="Reservatoin time"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="people">
            Number of People
            <input
              name="people"
              id="people"
              className="form-control"
              placeholder="Number of people"
            />
          </label>
        </div>
        <div className="">
          <button type="cancel" className="btn btn-secondary mr-3">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewReservation;
