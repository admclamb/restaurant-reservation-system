const ChangeDate = ({ date, setDate }) => {
  return (
    <input
      type="date"
      className="form-control"
      value={date}
      onChange={(event) => setDate(event.target.value)}
    />
  );
};

export default ChangeDate;
