import React from "react";
import { Link } from "react-router-dom";
import "./ZookeeperPage.css";

function ZookeeperPage() {
  return (
    <div className="zookeeper-container">
      <h1>🦺 Zookeeper Management</h1>
      <p>Manage the zoo's animals, habitats, species, feeding schedules, events, and memberships.</p>

      <div className="dashboard-grid">
        <Link to="/animals" className="dashboard-card">🦁 Manage Animals</Link>
        <Link to="/habitats" className="dashboard-card">🌿 Manage Habitats</Link>
        <Link to="/species" className="dashboard-card">🔬 Manage Species</Link>
        <Link to="/feeding" className="dashboard-card">🍽 Manage Feeding Schedules</Link>
        <Link to="/tickets" className="dashboard-card">🎟 View Booked Tickets</Link>
        <Link to="/manage-events" className="dashboard-card">🎉 Add/Edit Events</Link>
        <Link to="/manage-memberships" className="dashboard-card">💳 Add/Edit Memberships</Link>
      </div>
    </div>
  );
}

export default ZookeeperPage;
