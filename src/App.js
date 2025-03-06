import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import Habitats from "./pages/Habitats";
import Species from "./pages/Species";
import FeedingSchedules from "./pages/FeedingSchedules";
import Tickets from "./pages/Tickets";
import "./App.css"; 

function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
