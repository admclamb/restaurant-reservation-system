import { useState } from "react";
import Reservations from "../reservations/Reservations";
import ErrorAlert from "../layout/ErrorAlert";
import { list_reservations_phone } from "../utils/api";

const Search = () => {
  const [foundReservations, setFoundReservations] = useState([]);
  const [mobile_numberError, setMobile_numberError] = useState(null);
  const [mobile_number, setMobile_number] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const abortController = new AbortController();
      const response = await list_reservations_phone(
        mobile_number,
        abortController.signal
      );
      setFoundReservations(response);
      setMobile_number("");
    } catch (error) {
      setMobile_numberError(error);
    }
  };
  return (
    <>
      <main className="container pt-3 mb-5">
        <h1>Search</h1>
        <p className="mb-4">Search reservation by phone number</p>
        <form className="row" id="phone-lookup" onSubmit={handleSubmit}>
          <ErrorAlert error={mobile_numberError} />
          <div className="col-12 mb-2">
            <label htmlFor="mobile_number" className="mb-2">
              Enter Phone Number
            </label>
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              className="form-control"
              placeholder="mobile number"
              value={mobile_number}
              onChange={({ target }) => setMobile_number(target.value)}
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-main"
              type="submit"
              value="Find"
              form="phone-lookup"
            >
              Find
            </button>
          </div>
        </form>
        <section className="mt-4">
          <Reservations reservations={foundReservations} />
        </section>
      </main>
    </>
  );
};
export default Search;
