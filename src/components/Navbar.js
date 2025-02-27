import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional: Add CSS later for styling

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Digital Zoo</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/animals">Animals</Link>
          <Link className="nav-link" to="/habitats">Habitats</Link>
          <Link className="nav-link" to="/species">Species</Link>
          <Link className="nav-link" to="/feeding">Feeding Schedules</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
