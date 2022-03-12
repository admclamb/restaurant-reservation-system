import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

const NewReservation = () => {
  const history = useHistory();
  const initReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [reservation, setReservation] = useState(initReservation);

  const handleChange = ({ target }) => {
    const { id } = target;
    setReservation({
      ...reservation,
      [id]: target.value,
    });
    return;
  };

  const handleCancel = () => {
    setReservation(initReservation);
    history.push("/");
    return;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdReservation = await createReservation(reservation);
    setReservation(initReservation);
    history.push("/dashboard");
    return;
  };

  console.log(reservation);
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
              aria-describedby="firstName"
              value={reservation.first_name}
              onChange={handleChange}
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
              aria-describedby="lastName"
              value={reservation.last_name}
              onChange={handleChange}
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
              aria-describedby="phoneNumber"
              value={reservation.mobile_number}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="date">
            Date of Reservation
            <input
              type="date"
              name="reservation_date"
              id="reservation_date"
              className="form-control"
              placeholder="Reservation date"
              aria-describedby="date"
              value={reservation.reservation_date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="time">
            Time of Reservation
            <input
              type="time"
              name="reservation_time"
              id="reservation_time"
              className="form-control"
              placeholder="Reservatoin time"
              aria-describedby="time"
              value={reservation.reservation_time}
              onChange={handleChange}
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
              aria-describedby="numberOfPeople"
              value={reservation.people}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="">
          <button className="btn btn-secondary mr-3" onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewReservation;
