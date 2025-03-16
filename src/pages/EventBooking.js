import React, { useEffect, useState } from "react";
import { getEventBookings } from "../api";
import "./EventBooking.css";

function EventBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getEventBookings().then(setBookings);
  }, []);

  return (
    <div className="booking-container">
      <h2>📜 Event Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.visitor} booked {booking.event}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventBooking;
