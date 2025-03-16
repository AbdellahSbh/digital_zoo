import React, { useState, useEffect } from "react";
import { getSpecialEvents, addSpecialEvent } from "../api";
import "./ManageEvents.css";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", description: "", date: "", location: "" });

  useEffect(() => {
    getSpecialEvents().then(setEvents);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addSpecialEvent(newEvent).then(() => {
      setEvents([...events, newEvent]);
      alert("Event added successfully!");
    });
  };

  return (
    <div className="manage-events-container">
      <h2>🎉 Manage Events</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} required />
        <textarea placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required></textarea>
        <input type="date" onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
        <input type="text" placeholder="Location" onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
        <button type="submit">Add Event</button>
      </form>

      <h3>📅 Existing Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageEvents;
