![Periodic Tables](https://raw.githubusercontent.com/micah-patrick/restaurant-reservation/main/front-end/src/readme/readme-header.png 'Periodic Tables')

#

# Periodic Tables | Restaurant Reservation System

Periodic Tables is a restaurant reservation system for fine dining restaurants. Users of the application are restaurant employees who wish to take reservations when a customer calls and to seat them when they come in to the restaurant.

#

## LINKS

- [Live App](https://dry-brook-13595.herokuapp.com/)
- [Live Server](https://warm-crag-78549.herokuapp.com/reservations)

#

## SKILLS USED

### Frontend

- React
- Javascript
- HTML / JSX
- CSS
- Bootstrap
- React Router
- React Hooks (useState, useEffect)

### Backend

- Node.js
- Express
- Knex
- Cors
- Dotenv

#

## DESCRIPTION

A restaurant manager wants to create a new reservation when a customer calls so that she knows how many customers will show up on a given day. _Periodic Tables_ allows her to create a new reservation with the guest's name, number, party size, date, and time.

The restaurant manager only wants reservations to be made during business hours so that she or one of her employees doesn't accidentally make a reservation for a date or time that they cannot accommodate their guests. _Periodic Tables_ limits the creation of new reservations to future dates and during business hours (currently, between 10:30 am and 9:30 pm every day except Tuesdays).

The restaurant manager wants to be able to assign guests with a reservation to a table when they arrive. This way she can keep track of who is seated and which tables are occupied. _Periodic Tables_ allows her to create tables with a name and capacity. She can then use the app to assign a reservation to an available table (one with a capacity that will accommodate the reservation's guests). She can then free up the table when the guests are done.

The restaurant manager wants to be able to easily see the status of the reservations so she can keep track of which guests have been served. _Periodic Tables_ assigns a status of _booked, seated, finished,_ or _canceled_. _finished_ and _canceled_ reservations are hidden from the dashboard.

The restaurant manager wants to be able to search for a reservation by phone number so that if they call with a question, she can quickly find their reservation. _Periodic Tables_ allows her to search a partial or complete phone number and get back a list of all matching reservations.

The restaurant manager wants to be able to modify or cancel a reservation to keep the reservations up to date. _Periodic Tables_ allows reservations that have not yet been seated to be edited or canceled.

#

## SCREENSHOTS

### Home Page / Dashboard:

The Dashboard displays a date, buttons and a date picker to change date, and lists of reservations (for the given date) and all tables.

`path = '/dashboard'
![dashboard](https://raw.githubusercontent.com/micah-patrick/restaurant-reservation/main/front-end/src/readme/screenshot-dash.png)

### Search:

The Search page displays reservations with phone numbers matching the search input. The search works with full or partial phone numbers.
`path = '/search'
![search](https://raw.githubusercontent.com/micah-patrick/restaurant-reservation/main/front-end/src/readme/screenshot-search.png)

### Status:

Reservations can have a `status` of _booked, seated, finished,_ or _cancelled_.

![search](https://raw.githubusercontent.com/micah-patrick/restaurant-reservation/main/front-end/src/readme/screenshot-status.png)
Tables can be _occupied_ or _free_
![search](https://raw.githubusercontent.com/micah-patrick/restaurant-reservation/main/front-end/src/readme/screenshot-tables.png)

#

## API

### ERD:

![erd](https://raw.githubusercontent.com/micah-patrick/restaurant-reservation/main/front-end/src/readme/erd.png 'erd')

### Reservations

The `reservations` table represents reservations to the restaurant. Each reservation has the following fields:

- `reservation_id`: (Primary Key)
- `first_name`: (String) The first name of the customer.
- `last_name`: (String) The last name of the customer.
- `mobile_number`: (String) The customer's cell number.
- `reservation_date`: (Date) The date of the reservation.
- `reservation_time`: (Time) The time of the reservation.
- `people`: (Integer) The size of the party.
- `Status`: (String) The reservation status can be _booked, seated, finished, or cancelled_ and defaults to _booked._

An example record looks like the following:

```json
{
  "first_name": "Rick",
  "last_name": "Sanchez",
  "mobile_number": "202-555-0164",
  "reservation_date": "2020-12-31",
  "reservation_time": "20:00:00",
  "people": 6,
  "status": "booked"
}
```

### Tables

The `tables` table represents the tables that are available in the restaurant. Each table has the following fields:

- `table_id`: (Primary Key)
- `table_name`: (String) The name of the table.
- `capacity`: (Integer) The maximum number of people that the table can seat.
- `reservation_id`: (Foreign Key) The reservation - if any - that is currently seated at the table.

An example record looks like the following:

```json
{
  "table_name": "Bar #1",
  "capacity": 1,
  "reservation_id": 8
}
```

### Routes

The API allows for the following routes:

| Method   | Route                                  | Description                                                                                                                      |
| -------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/reservations`                        | List all reservations for current date.                                                                                          |
| `GET`    | `/reservations?date=YYYY-MM-DD`        | List all reservations on query date.                                                                                             |
| `POST`   | `/reservations`                        | Create a new reservation. No `reservation_id` or `status` should be provided. All other fields are required.                     |
| `GET`    | `/reservations/:reservation_id`        | Read a specific reservation `by reservation_id`.                                                                                 |
| `PUT`    | `/reservations/:reservation_id`        | Update a specific reservation `by reservation_id`.                                                                               |
| `PUT`    | `/reservations/:reservation_id/status` | Update the status of a reservation.                                                                                              |
| `GET`    | `/tables`                              | List all tables.                                                                                                                 |
| `POST`   | `/tables`                              | Create new table. Only `table_name` and `capacity` should be provided.                                                           |
| `PUT`    | `/tables/:table_id/seat`               | Assign a table to a reservation and change that reservation's `status` to _seated_. Body should contain only a `reservation_id`. |
| `DELETE` | `/tables/:table_id/seat`               | Removes a reservation from a table and changes reservation's `status` to _finished_                                              |
| `GET`    | `/tables/free`                         | List all unoccupied tables.                                                                                                      |

#

## INSTALLATION INSTRUCTIONS

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your PostgreSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
1. Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.
