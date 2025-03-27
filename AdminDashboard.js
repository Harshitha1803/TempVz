import React, { useState } from "react";
import "./AdminDashboard.css";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const AdminDashboard = () => {
  const [openSection, setOpenSection] = useState(null);

  // Toggle Sidebar Sections
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="admin-dashboard">
      {/* Top Navbar */}
      {/* <header className="admin-header">
        <div className="logo"> <span className="verizon-logo">verizon</span> </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="home-button">Home</div>
      </header> */}

      {/* Sidebar + Main Content */}
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* Dashboard */}
          <div className="sidebar-item" onClick={() => setOpenSection(null)}>
            Dashboard
          </div>

          {/* Intern Management Section */}
          <div className="sidebar-item" onClick={() => toggleSection("internManagement")}>
            Intern Management {openSection === "internManagement" ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openSection === "internManagement" && (
            <div className="submenu">
              <div className="submenu-item">Register Interns</div>
              <div className="submenu-item">Map Interns</div>
              <div className="submenu-item">Manage Gamify Teams</div>
            </div>
          )}

          {/* Courses Section */}
          <div className="sidebar-item" onClick={() => toggleSection("courses")}>
            Courses {openSection === "courses" ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openSection === "courses" && (
            <div className="submenu">
              <div className="submenu-item">Add Courses</div>
              <div className="submenu-item">Track Courses</div>
            </div>
          )}

          {/* Events & Meetings Section */}
          <div className="sidebar-item" onClick={() => toggleSection("eventsMeetings")}>
            Events & Meetings {openSection === "eventsMeetings" ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openSection === "eventsMeetings" && (
            <div className="submenu">
              <div className="submenu-item">Schedule a Meeting</div>
              <div className="submenu-item">View Meetings</div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          <h2>Admin Dashboard</h2>
          <div className="announcement">
            <h3>Announcement Name</h3>
            <p>Brief of announcement</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
