import React, { useEffect, useState } from "react";
import { fetchTickets, addTicket } from "../api";
import TicketForm from "../components/TicketForm";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets().then((response) => setTickets(response.data));
  }, []);

  const handleTicketAdded = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  return (
    <div>
      <h2>Visitor Tickets</h2>
      <TicketForm onTicketAdded={handleTicketAdded} />
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.visitor} - Expiry: {ticket.expiry_date} - Ticket Code: {ticket.ticket_code}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
