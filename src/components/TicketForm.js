import React, { useState } from "react";
import { addTicket } from "../api";

function TicketForm({ onTicketAdded }) {
  const [visitorName, setVisitorName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visitorName.trim() || !expiryDate.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await addTicket({ visitor: visitorName, expiry_date: expiryDate });
      onTicketAdded(response.data);
      setVisitorName("");
      setExpiryDate("");
    } catch (error) {
      console.error("Error adding ticket:", error.response?.data || error);
      alert("Failed to add ticket. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🎟 Register for a Ticket</h3>
      <input
        type="text"
        placeholder="Visitor Username"
        value={visitorName}
        onChange={(e) => setVisitorName(e.target.value)}
        required
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />
      <button type="submit">✅ Get Ticket</button>
    </form>
  );
}

export default TicketForm;
