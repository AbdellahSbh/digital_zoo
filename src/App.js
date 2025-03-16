import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ZookeeperPage from "./pages/ZookeeperPage";
import ManageEvents from "./pages/ManageEvents";
import ManageMemberships from "./pages/ManageMemberships";
import GuestMode from "./pages/GuestMode";
import Animals from "./pages/Animals";
import Habitats from "./pages/Habitats";
import Species from "./pages/Species";
import FeedingSchedules from "./pages/FeedingSchedules";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/guest" element={<GuestMode />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/zookeeper" element={<ZookeeperPage />} />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/manage-memberships" element={<ManageMemberships />} />

        {/* Database Management */}
        <Route path="/animals" element={<Animals />} />
        <Route path="/habitats" element={<Habitats />} />
        <Route path="/species" element={<Species />} />
        <Route path="/feeding" element={<FeedingSchedules />} />
      </Routes>
    </Router>
  );
}

export default App;
