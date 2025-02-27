import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Welcome to the Digital Zoo</h2>
      <p>Manage all the zoo information from this dashboard.</p>
      <ul>
        <li><Link to="/animals">Manage Animals</Link></li>
        <li><Link to="/habitats">Manage Habitats</Link></li>
        <li><Link to="/species">Manage Species</Link></li>
        <li><Link to="/feeding">Manage Feeding Schedules</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
