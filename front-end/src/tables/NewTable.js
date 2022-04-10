import { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";
import { validateNewTable } from "../utils/validation";
import TableForm from "./TableForm";

const NewTable = () => {
  const [table, setTable] = useState({ table_name: "", capacity: 0 });
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const validationResponse = validateNewTable(table);
      if (!validationResponse) {
        const abortController = new AbortController();
        await createTable(table, abortController.signal);
        history.push("/dashboard");
      } else {
        setErrors(validationResponse);
      }
    } catch (error) {
      setErrors(error);
    }
  };
  return (
    <>
      <header className="container pt-3 mb-3">
        <h1>New Table</h1>
      </header>
      <main className="container">
        <ErrorAlert error={errors} />
        <TableForm
          table={table}
          setTable={setTable}
          handleSubmit={handleSubmit}
          history={history}
        />
      </main>
    </>
  );
};
export default NewTable;
