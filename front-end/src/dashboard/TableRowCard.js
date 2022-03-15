import { formatAsDate, formatAsTime } from "../utils/date-time";

const TableRowCard = ({ reservation }) => {
  const {
    people,
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    reservation_date,
  } = reservation;

  return (
    <tr>
      <th scope="row">{people}</th>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{mobile_number}</td>
      <td>{formatAsTime(reservation_time)}</td>
      <td>{formatAsDate(reservation_date)}</td>
    </tr>
  );
};
export default TableRowCard;
