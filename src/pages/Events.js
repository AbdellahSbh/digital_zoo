import React, { useEffect, useState } from "react";
import { getSpecialEvents } from "../api";  
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getSpecialEvents()
      .then((response) => {
        console.log("✅ Special Events:", response.data);  // ✅ Debugging log
        setEvents(response.data);
      })
      .catch((error) => console.error("❌ Error fetching events:", error));
  }, []);

  return (
    <div className="events-container">
      <h2>📅 Upcoming Zoo Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.name}</strong> - {event.date}
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>❌ No events found. Try adding one.</p>
      )}
    </div>
  );
}

export default Events;
