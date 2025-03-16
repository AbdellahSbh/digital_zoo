import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>🐾 Welcome to Our Digital Zoo</h1>
      <p>Explore our memberships, events, and manage the zoo!</p>

      <div className="dashboard-grid">
        <button className="dashboard-button" onClick={() => navigate("/guest")}>
          👤 Enter as Guest
        </button>
        <button className="dashboard-button" onClick={() => navigate("/tickets")}>
          📅 View & Book Events
        </button>
        <button className="dashboard-button" onClick={() => navigate("/zookeeper")}>
          🦺 Manage Zoo
        </button>
        <button className="dashboard-button" onClick={() => navigate("/memberships")}>
          🎟 Zoo Memberships
        </button>
        <button className="dashboard-button" onClick={() => navigate("/events")}>
          🎉 Special Events
        </button>
        <button className="dashboard-button" onClick={() => navigate("/event-bookings")}>
          📝 Event Bookings
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
