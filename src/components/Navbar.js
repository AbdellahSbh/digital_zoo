import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const role = localStorage.getItem("role");

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">🏡 Dashboard</Link></li>

                {/*  Show These Pages Only for Admins */}
                {role === "admin" && <>
                    <li><Link to="/animals">🦁 Animals</Link></li>
                    <li><Link to="/habitats">🌿 Habitats</Link></li>
                    <li><Link to="/species">🔬 Species</Link></li>
                    <li><Link to="/feeding">🍽 Feeding Schedules</Link></li>
                    <li><Link to="/tickets">🎟 Tickets</Link></li>
                </>}

                {/* Zookeepers Can See Their Assigned Tasks */}
                {(role === "admin" || role === "zookeeper") && <li><Link to="/care-routines">📅 Care Routines</Link></li>}

                {/* Guest Mode for Visitors */}
                <li><Link to="/guest">👤 Guest Mode</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
