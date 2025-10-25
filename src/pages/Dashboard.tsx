// src/pages/Dashboard.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

import AdminDashboard from "./AdminDashboard";
import AdopterDashboard from "./AdopterDashboard";
import StaffDashboard from "./StaffDashboard";
import TrainerDashboard from "./TrainerDashboard";
import VetDashboard from "./VetDashboard";

//import "./Dashboard.css";

// Dummy user for testing
const currentUser = {
  id: "u1",
  name: "Jivesh Malhotra",
  role: "staff", // change to "adopter", "staff", "trainer", "vet" to test other dashboards
};

export default function Dashboard() {
  // Function to render dashboard based on role
  const renderDashboard = () => {
    switch (currentUser.role) {
      case "admin":
        return <AdminDashboard />;
      case "adopter":
        return <AdopterDashboard />;
      case "staff":
        return <StaffDashboard />;
      case "trainer":
        return <TrainerDashboard />;
      case "vet":
        return <VetDashboard />;
      default:
        return <p>Role not recognized.</p>;
    }
  };

  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-content">
        {/*<Sidebar role={currentUser.role} />  sidebar can also adapt based on role */}
        <main className="dashboard-main">
          {/*<h1>Welcome, {currentUser.name}</h1>*/}
          {renderDashboard()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
