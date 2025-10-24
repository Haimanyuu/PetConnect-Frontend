// src/pages/StaffDashboard.tsx
import React, { useState } from "react";

const dummyTasks = [
  { id: "t1", title: "Check-in pets", status: "pending" },
  { id: "t2", title: "Clean kennel", status: "in_progress" },
  { id: "t3", title: "Update records", status: "completed" },
];

const StaffDashboard: React.FC = () => {
  const [tasks] = useState(dummyTasks);

  return (
    <div className="role-dashboard">
      <h1>Staff Dashboard</h1>

      <div className="cards-grid">
        <div className="card">Total Tasks: {tasks.length}</div>
        <div className="card">
          Pending: {tasks.filter(t => t.status === "pending").length}
        </div>
        <div className="card">
          Completed: {tasks.filter(t => t.status === "completed").length}
        </div>
      </div>

      <div className="tasks-section">
        <h2>My Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;
