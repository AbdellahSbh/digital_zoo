import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import Habitats from "./pages/Habitats";
import Species from "./pages/Species";
import FeedingSchedules from "./pages/FeedingSchedules";
import Tickets from "./pages/Tickets";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
  });

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/habitats" element={<Habitats />} />
          <Route path="/species" element={<Species />} />
          <Route path="/feeding" element={<FeedingSchedules />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
