// src/pages/TrainerDashboard.tsx
import React, { useState } from "react";

const dummySessions = [
  { id: "s1", pet: "Buddy", time: "10:00 AM", status: "scheduled" },
  { id: "s2", pet: "Mittens", time: "1:00 PM", status: "completed" },
];

const TrainerDashboard: React.FC = () => {
  const [sessions] = useState(dummySessions);

  return (
    <div className="role-dashboard">
      <h1>Trainer Dashboard</h1>

      <div className="cards-grid">
        <div className="card">Scheduled Sessions: {sessions.length}</div>
        <div className="card">
          Completed: {sessions.filter(s => s.status === "completed").length}
        </div>
      </div>

      <div className="sessions-section">
        <h2>My Training Sessions</h2>
        <table>
          <thead>
            <tr>
              <th>Pet</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id}>
                <td>{s.pet}</td>
                <td>{s.time}</td>
                <td>{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerDashboard;
