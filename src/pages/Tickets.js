import React, { useState, useEffect } from "react";
import { getTickets, addTicket } from "../api"; // ✅ Correct API imports

function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [visitorName, setVisitorName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    // ✅ Define function BEFORE useEffect calls it
    const fetchAllTickets = () => {
        getTickets()
            .then((response) => setTickets(response.data))
            .catch((error) => console.error("Error fetching tickets:", error));
    };

    useEffect(() => {
        fetchAllTickets();
    }, []);

    const handleAddTicket = (e) => {
        e.preventDefault();
        const newTicket = {
            visitor: visitorName,
            expiry_date: expiryDate,
        };

        addTicket(newTicket)
            .then(() => {
                fetchAllTickets(); // ✅ Refresh list after adding
                setVisitorName(""); 
                setExpiryDate(""); 
            })
            .catch((error) => console.error("Error adding ticket:", error.response?.data || error));
    };

    return (
        <div>
            <h2>🎟 Ticket Management</h2>

            {/* ✅ Ticket Form */}
            <form onSubmit={handleAddTicket}>
                <input
                    type="text"
                    placeholder="Visitor Name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Expiry Date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                />
                <button type="submit">✅ Issue Ticket</button>
            </form>

            <h3>Existing Tickets</h3>
            {tickets.length > 0 ? (
                <ul>
                    {tickets.map((ticket) => (
                        <li key={ticket.id}>
                            🎫 <strong>Visitor:</strong> {ticket.visitor} | <strong>Expires:</strong> {ticket.expiry_date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tickets found.</p>
            )}
        </div>
    );
}

export default Tickets;
