/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

let API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    console.log("response", response);
    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Retrieves all existing Tables.
 * @returns {Promise<[tables]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listTables(params, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, []);
}
/**
 * Retrieves a reservation from a reservation_id
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function readReservation(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  return await fetchJson(url, { signal }, []);
}

/**
 * Retrieves a Table from a table_id
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function readTable(table_id, signal) {
  const url = new URL(`${API_BASE_URL}/${table_id}`);
  return await fetchJson(url, { signal }, []);
}

/**
 * Creates and returns a reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function createReservation(data, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const body = { data };
  const method = "POST";
  return await fetchJson(
    url,
    { headers, body: JSON.stringify(body), method, signal },
    []
  );
}

export async function createTable(data, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const body = { data };
  const method = "POST";
  return await fetchJson(url, {
    headers,
    body: JSON.stringify(body),
    method,
    signal,
  });
}

export async function updateReservation(data, reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  const body = { data };
  const method = "PUT";
  return await fetchJson(
    url,
    { headers, body: JSON.stringify(body), method, signal },
    []
  );
}

/**
 *
 * @param data is an object with reservation_id and table_id
 * and then is formatted to the request as data: { reservation_id }
 * This was used to access the table in the server and send the new
 * reservation
 */

export async function updateTableSeat(data, signal) {
  const { table_id, reservation_id } = data;
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const body = { data: { reservation_id } };
  const method = "PUT";
  return await fetchJson(
    url,
    { headers, body: JSON.stringify(body), method },
    []
  );
}

export async function updateReservationStatus(reservation_id, status, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/status`);
  const body = { data: { status } };
  const method = "PUT";
  return await fetchJson(
    url,
    { headers, body: JSON.stringify(body), method },
    []
  );
}

export async function finishReservationTable(table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const method = "DELETE";
  const response = await fetchJson(url, { headers, method }, signal);
  return response;
}

// GET resrvations by phone number lookup
export async function list_reservations_phone(mobile_number, signal) {
  const url = new URL(
    `${API_BASE_URL}/reservations?mobile_number=${mobile_number}`
  );
  return await fetchJson(url, { headers, signal }, []);
}
