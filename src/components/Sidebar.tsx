// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  user: { role: "admin" | "adopter" | "staff" | "trainer" | "vet" };
}

const linksByRole: Record<string, { name: string; path: string }[]> = {
  admin: [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Manage Pets", path: "/admin/pets" },
    { name: "Approvals", path: "/admin/approvals" },
  ],
  adopter: [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Browse Pets", path: "/adopter/browse" },
    { name: "My Adoptions", path: "/adopter/adoptions" },
    { name: "Foster Requests", path: "/adopter/foster-requests" },
  ],
  staff: [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Tasks", path: "/staff/tasks" },
    { name: "Pet Check-in", path: "/staff/checkin" },
    { name: "Reports", path: "/staff/reports" },
  ],
  trainer: [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "My Sessions", path: "/trainer/sessions" },
    { name: "Training Schedule", path: "/trainer/schedule" },
  ],
  vet: [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Patient Records", path: "/vet/patients" },
    { name: "Appointments", path: "/vet/appointments" },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const links = linksByRole[user.role] || [];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <nav className="sidebar-nav">
        <ul>
          {links.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
