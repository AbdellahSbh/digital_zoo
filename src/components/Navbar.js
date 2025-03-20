// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {
//     const role = localStorage.getItem("role");

//     return (
//         <nav className="navbar">
//             <ul>
//                 <li><Link to="/">🏡 Dashboard</Link></li>

//                 {/*  Show These Pages Only for Admins */}
//                 {role === "admin" && <>
//                     <li><Link to="/animals">🦁 Animals</Link></li>
//                     <li><Link to="/habitats">🌿 Habitats</Link></li>
//                     <li><Link to="/species">🔬 Species</Link></li>
//                     <li><Link to="/feeding">🍽 Feeding Schedules</Link></li>
//                     <li><Link to="/tickets">🎟 Tickets</Link></li>
//                 </>}

//                 {/* Zookeepers Can See Their Assigned Tasks */}
//                 {(role === "admin" || role === "zookeeper") && <li><Link to="/care-routines">📅 Care Routines</Link></li>}

//                 {/* Guest Mode for Visitors */}
//                 <li><Link to="/guest">👤 Guest Mode</Link></li>
//             </ul>
//         </nav>
//     );
// }

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Don't show navbar on login page
  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to={currentUser?.role === 'zookeeper' ? '/zookeeper' : '/dashboard'}>
          Zoo Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {currentUser?.role === 'zookeeper' ? (
              // Zookeeper Menu Items
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/zookeeper">ZookeeperPage</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feeding">Feeding Schedules</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/animals">Animals</Link>
                </li>
              </>
            ) : (
              // Admin/Visitor Menu Items
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/animals">Animals</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/habitats">Habitats</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/species">Species</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tickets">Tickets</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-events">Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-memberships">Memberships</Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="navbar-text me-3">
            Logged in as: <span className="fw-bold">{currentUser?.username}</span> ({currentUser?.role})
          </div>
          
          <button 
            className="btn btn-outline-light" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;