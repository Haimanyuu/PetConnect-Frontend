// src/pages/AdopterDashboard.tsx
import React, { useState } from "react";

const dummyAdoptions = [
  { id: "a1", pet: "Buddy", status: "approved" },
  { id: "a2", pet: "Mittens", status: "pending" },
  { id: "a3", pet: "Charlie", status: "in_discussion" },
];

const AdopterDashboard: React.FC = () => {
  const [adoptions] = useState(dummyAdoptions);

  return (
    <div className="role-dashboard">
      <h1>Adopter Dashboard</h1>

      <div className="cards-grid">
        <div className="card">Total Adoptions: {adoptions.length}</div>
        <div className="card">
          Approved: {adoptions.filter(a => a.status === "approved").length}
        </div>
        <div className="card">
          Pending: {adoptions.filter(a => a.status === "pending").length}
        </div>
      </div>

      <div className="adoptions-section">
        <h2>My Adoption Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Pet</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map(a => (
              <tr key={a.id}>
                <td>{a.pet}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdopterDashboard;
