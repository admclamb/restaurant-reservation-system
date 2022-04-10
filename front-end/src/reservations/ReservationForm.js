const ReservationForm = ({
  reservation,
  setReservation,
  handleSubmit,
  handleCancel,
}) => {
  const handleChange = ({ target }) => {
    const { id } = target;
    // Ensure that the data type is a number
    if (target.type === "number") {
      setReservation({
        ...reservation,
        [id]: Number(target.value),
      });
    } else {
      setReservation({
        ...reservation,
        [id]: target.value,
      });
    }
    return;
  };

  return (
    <form className="row g-3" id="new-reservation-form" onSubmit={handleSubmit}>
      <div className="col-md-4">
        <label htmlFor="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          className="form-control"
          placeholder="First name"
          aria-describedby="firstName"
          value={reservation.first_name}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Must provide a fist name.</div>
        <div className="valid-feedback">Looks Good!</div>
      </div>

      <div className="col-md-4">
        <label htmlFor="last_name">Last Name</label>
        <input
          name="last_name"
          id="last_name"
          className="form-control"
          placeholder="Last name"
          aria-describedby="lastName"
          value={reservation.last_name}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Must provide a last name.</div>
        <div className="valid-feedback">Looks Good!</div>
      </div>
      <div className="col-12 col-md-4">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          name="mobile_number"
          type="tel"
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          id="mobile_number"
          className="form-control"
          placeholder="Mobile number"
          aria-describedby="phoneNumber"
          value={reservation.mobile_number}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Must provide a phone number.</div>
        <div className="valid-feedback">Looks Good!</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="date">Date of Reservation</label>
        <input
          type="date"
          name="reservation_date"
          id="reservation_date"
          className="form-control"
          placeholder="Reservation Date"
          aria-describedby="date"
          value={reservation.reservation_date}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Must provide a date.</div>
        <div className="valid-feedback">Looks Good!</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="time">Time of Reservation</label>
        <input
          type="time"
          name="reservation_time"
          id="reservation_time"
          className="form-control"
          placeholder="Reservation time"
          aria-describedby="time"
          value={reservation.reservation_time}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Must provide a time.</div>
        <div className="valid-feedback">Looks Good!</div>
      </div>
      <div className="col-12 col-md-3">
        <label htmlFor="people">Number of People</label>
        <input
          type="number"
          name="people"
          id="people"
          className="form-control"
          placeholder="Number of people"
          aria-describedby="numberOfPeople"
          value={reservation.people}
          onChange={handleChange}
        />
        <div className="invalid-feedback">
          Must provide the amount of people and cannot be zero.
        </div>
        <div className="valid-feedback">Looks Good!</div>
      </div>
      <div className="form-btns">
        <button className="btn btn-secondary me-3" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="btn btn-main"
          type="submit"
          form="new-reservation-form"
          value="Submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
