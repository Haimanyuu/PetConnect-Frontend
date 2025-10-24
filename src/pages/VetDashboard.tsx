// src/pages/VetDashboard.tsx
import React, { useState } from "react";

const dummyPatients = [
  { id: "p1", pet: "Charlie", owner: "Alice", lastVisit: "2025-10-20", vaccine: "Rabies" },
  { id: "p2", pet: "Mittens", owner: "Bob", lastVisit: "2025-10-18", vaccine: "Feline Distemper" },
];

const VetDashboard: React.FC = () => {
  const [patients] = useState(dummyPatients);

  return (
    <div className="role-dashboard">
      <h1>Vet Dashboard</h1>

      <div className="cards-grid">
        <div className="card">Total Patients: {patients.length}</div>
        <div className="card">
          Last Visit: {patients.map(p => p.lastVisit).join(", ")}
        </div>
      </div>

      <div className="patients-section">
        <h2>Patient Records</h2>
        <table>
          <thead>
            <tr>
              <th>Pet</th>
              <th>Owner</th>
              <th>Last Visit</th>
              <th>Vaccine</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>{p.pet}</td>
                <td>{p.owner}</td>
                <td>{p.lastVisit}</td>
                <td>{p.vaccine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VetDashboard;
