import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ZookeeperPage from "./pages/ZookeeperPage";
import ManageEvents from "./pages/ManageEvents";
import ManageMemberships from "./pages/ManageMemberships";
import GuestMode from "./pages/GuestMode";
import Animals from "./pages/Animals";
import Habitats from "./pages/Habitats";
import Species from "./pages/Species";
import FeedingSchedules from "./pages/FeedingSchedules";
import Tickets from "./pages/Tickets";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Events from "./pages/Events"
import Memberships from "./pages/Memberships"
import EventBooking from "./pages/EventBooking"
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/guest" element={<GuestMode />} />
          <Route path="/" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/event-bookings" element={<EventBooking />} />
        
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/habitats" element={<Habitats />} />
            <Route path="/species" element={<Species />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/manage-events" element={<ManageEvents />} />
            <Route path="/manage-memberships" element={<ManageMemberships />} />  


          {/* Zookeeper specific routes */}
          <Route element={<ProtectedRoute requiredRole="zookeeper" />}>
            <Route path="/zookeeper" element={<ZookeeperPage />} />
            <Route path="/feeding" element={<FeedingSchedules />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;