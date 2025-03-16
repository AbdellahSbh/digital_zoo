import React, { useState } from "react";
import "./Tickets.css";

function Tickets() {
  const [visitor, setVisitor] = useState({ name: "", event: "", date: "" });
  const eventsList = ["Animal Feeding", "Night Safari", "Kids Adventure", "Wildlife Talks"];

  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Booking Ticket:", visitor);
    alert(`Ticket booked for ${visitor.name} on ${visitor.date} for ${visitor.event}!`);
  };

  return (
    <div className="tickets-container">
      <h2>📅 Upcoming Zoo Events</h2>
      <ul>
        {eventsList.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>

      <h3>🎟 Book a Ticket</h3>
      <form onSubmit={handleBooking}>
        <input type="text" placeholder="Your Name" value={visitor.name} onChange={(e) => setVisitor({ ...visitor, name: e.target.value })} required />
        <select value={visitor.event} onChange={(e) => setVisitor({ ...visitor, event: e.target.value })} required>
          <option value="">Select an Event</option>
          {eventsList.map((event, index) => (
            <option key={index} value={event}>{event}</option>
          ))}
        </select>
        <input type="date" value={visitor.date} onChange={(e) => setVisitor({ ...visitor, date: e.target.value })} required />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default Tickets;
