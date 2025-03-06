import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // ✅ Ensure you create this file

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>🐾 Welcome to the Digital Zoo</h1>
      <p>Manage all the zoo information from this dashboard.</p>

      <div className="dashboard-links">
        <Link to="/animals" className="dashboard-button">Manage Animals</Link>
        <Link to="/habitats" className="dashboard-button">Manage Habitats</Link>
        <Link to="/species" className="dashboard-button">Manage Species</Link>
        <Link to="/feeding" className="dashboard-button">Manage Feeding Schedules</Link>
      </div>
    </div>
  );
}

export default Dashboard;
