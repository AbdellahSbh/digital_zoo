// import React, { useEffect, useState } from "react";
// import { getSpecialEvents } from "../api";  
// import "./Events.css";

// function Events() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     getSpecialEvents()
//       .then((response) => {
//         console.log("✅ Special Events:", response.data);  // ✅ Debugging log
//         setEvents(response.data);
//       })
//       .catch((error) => console.error("❌ Error fetching events:", error));
//   }, []);

//   return (
//     <div className="events-container">
//       <h2>📅 Upcoming Zoo Events</h2>
//       {events.length > 0 ? (
//         <ul>
//           {events.map((event) => (
//             <li key={event.id}>
//               <strong>{event.name}</strong> - {event.date}
//               <p>{event.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>❌ No events found. Try adding one.</p>
//       )}
//     </div>
//   );
// }

// export default Events;

import React, { useEffect, useState } from "react";
import { getSpecialEvents } from "../api";  
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSpecialEvents()
      .then((response) => {
        console.log("✅ Special Events Response:", response);
        
        // Handle different response structures
        const eventsData = response.data || response;
        
        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
        } else {
          console.error("❌ Response is not an array:", eventsData);
          setError("Unexpected data format received");
        }
      })
      .catch((error) => { 
        console.error("❌ Error fetching events:", error);
        setError("Failed to load events");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  if (loading) return <div className="events-container"><p>Loading events...</p></div>;
  if (error) return <div className="events-container"><p className="error">{error}</p></div>;

  return (
    <div className="events-container">
      <h2>📅 Upcoming Zoo Events</h2>
      {events.length > 0 ? (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <div className="event-date">{formatDate(event.date)}</div>
              <p className="event-description">{event.description}</p>
              <div className="event-location">📍 {event.location}</div>
              {event.is_member_exclusive && 
                <div className="member-exclusive">Members only</div>
              }
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming events scheduled.</p>
      )}
    </div>
  );
}

export default Events;