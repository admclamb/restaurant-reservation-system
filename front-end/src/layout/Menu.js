import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav
      className="navbar navbar-dark align-items-start p-0"
      style={{ height: "100vh" }}
    >
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span className="d-none d-md-inline">Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="fa-solid fa-gauge me-1"></i>
              <span className="d-none d-md-inline">&nbsp;Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              <i className="fa-solid fa-magnifying-glass me-1"></i>
              <span className="d-none d-md-inline">&nbsp;Search</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <i className="fa-solid fa-plus me-1"></i>
              <span className="d-none d-md-inline">&nbsp;New Reservation</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new">
              <i className="fa-solid fa-layer-group me-1"></i>
              <span className="d-none d-md-inline">&nbsp;New Table</span>
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
