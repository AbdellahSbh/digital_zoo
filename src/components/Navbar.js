import { Link } from "react-router-dom";
import "./Navbar.css"; 
import React from "react"; 

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/animals">Animals</Link></li>
                <li><Link to="/habitats">Habitats</Link></li>
                <li><Link to="/feeding">Feeding Schedules</Link></li>
                <li><Link to="/tickets">Tickets</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
