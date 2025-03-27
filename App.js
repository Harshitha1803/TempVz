import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./RoleSelection";
import Login from "./Login";
import Navbar from "./Navbar";
import "./styles.css";
import AdminDashboard from "./AdminDashboard";
import InternDashboard from "./InternDashboard";
import "@fontsource/poppins"; // Defaults to 400 weight


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login/:role" element={<Login />} />  {/* ✅ Accepts role as a URL param */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/intern-dashboard" element={<InternDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
