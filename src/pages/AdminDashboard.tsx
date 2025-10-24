import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "./AdminDashboard.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Sample data structure that matches the backend API response format
const sampleOverviewData = {
    totalUsers: 120,
    totalPets: 45,
    totalAdoptionRequests: 10,
    totalOrganizations: 5,
};

// Sample user distribution data by role
const sampleUserDistribution = [
    { _id: "adopter", count: 60 },
    { _id: "staff", count: 20 },
    { _id: "trainer", count: 15 },
    { _id: "vet", count: 10 },
    { _id: "admin", count: 15 },
];

// Sample pet distribution data by status
const samplePetDistribution = [
    { _id: "available", count: 25 },
    { _id: "adopted", count: 15 },
    { _id: "pending", count: 5 },
];

// Sample user data for user management tab
const sampleUsers = [
    { _id: "1", name: "John Doe", email: "john@example.com", role: "adopter", status: "active" },
    { _id: "2", name: "Jane Smith", email: "jane@example.com", role: "staff", status: "active" },
    { _id: "3", name: "Mike Johnson", email: "mike@example.com", role: "vet", status: "inactive" },
    { _id: "4", name: "Sarah Wilson", email: "sarah@example.com", role: "trainer", status: "active" },
    { _id: "5", name: "Alex Brown", email: "alex@example.com", role: "admin", status: "active" },
];

// Sample organization data
const sampleOrganizations = [
    { _id: "1", name: "Happy Paws Shelter", type: "Shelter", contact: { email: "contact@happypaws.com", phone: "123-456-7890" } },
    { _id: "2", name: "Pet Rescue Foundation", type: "Rescue", contact: { email: "info@petrescue.org", phone: "987-654-3210" } },
    { _id: "3", name: "City Animal Control", type: "Municipal", contact: { email: "animalcontrol@city.gov", phone: "555-123-4567" } },
];

// Sample activity logs for system monitoring
const sampleActivityLogs = [
    { _id: "1", user: { name: "John Doe", role: "adopter" }, action: "USER_LOGIN", target: "System", details: "User logged in successfully", createdAt: new Date().toISOString() },
    { _id: "2", user: { name: "Jane Smith", role: "staff" }, action: "PET_CREATED", target: "Pet Profile", details: "Created new pet profile: Max", createdAt: new Date().toISOString() },
    { _id: "3", user: { name: "Mike Johnson", role: "vet" }, action: "HEALTH_CHECK", target: "Medical Record", details: "Updated health records for Luna", createdAt: new Date().toISOString() },
    { _id: "4", user: { name: "Sarah Wilson", role: "trainer" }, action: "TRAINING_SESSION", target: "Training Log", details: "Completed obedience training session", createdAt: new Date().toISOString() },
];

// Sample system health data
const sampleSystemHealth = {
    healthChecks: {
        database: "healthy",
        authentication: "healthy",
        fileStorage: "healthy",
        emailService: "degraded"
    },
    uptime: 3600, // seconds
    timestamp: new Date().toISOString()
};

const AdminDashboard: React.FC = () => {
    // State management for all dashboard data
    const [overview, setOverview] = useState(sampleOverviewData);
    const [userDistribution, setUserDistribution] = useState(sampleUserDistribution);
    const [petDistribution, setPetDistribution] = useState(samplePetDistribution);
    const [users, setUsers] = useState(sampleUsers);
    const [organizations, setOrganizations] = useState(sampleOrganizations);
    const [activityLogs, setActivityLogs] = useState(sampleActivityLogs);
    const [systemHealth, setSystemHealth] = useState(sampleSystemHealth);
    const [activeTab, setActiveTab] = useState("analytics");
    const [loading, setLoading] = useState(false);

    // Simulate API calls when component mounts or tab changes
    useEffect(() => {
        setLoading(true);
        // Simulate API loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [activeTab]);

    // Handle tab navigation
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    // Simulate updating user role (in real app, this would call an API)
    const updateUserRole = (userId: string, currentRole: string) => {
        const newRole = prompt(`Enter new role for user (adopter, staff, vet, trainer, admin):`, currentRole);
        if (newRole && ["adopter", "staff", "vet", "trainer", "admin"].includes(newRole)) {
            alert(`User ${userId} role would be updated to ${newRole} (API call would be made here)`);
            // In real implementation: 
            // await updateUserRoleAPI(userId, newRole);
            // loadUsers(); // Refresh the user list
        }
    };

    // Simulate deleting a user (in real app, this would call an API)
    const deleteUser = (userId: string, userName: string) => {
        if (confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            alert(`User ${userName} would be deleted (API call would be made here)`);
            // In real implementation:
            // await deleteUserAPI(userId);
            // loadUsers(); // Refresh the user list
        }
    };

    // Chart configuration for user distribution (doughnut chart)
    const userChartData = {
        labels: userDistribution.map(u => u._id.charAt(0).toUpperCase() + u._id.slice(1)),
        datasets: [
            {
                data: userDistribution.map(u => u.count),
                backgroundColor: [
                    "#6bb7cc", // Primary blue for adopters
                    "#f8b679", // Secondary orange for staff
                    "#10B981", // Green for trainers
                    "#EF4444", // Red for vets
                    "#8B5CF6"  // Purple for admins
                ],
                borderColor: [
                    "#6bb7cc",
                    "#f8b679",
                    "#10B981",
                    "#EF4444",
                    "#8B5CF6"
                ],
                borderWidth: 2,
            },
        ],
    };

    // Chart configuration for pet status distribution (bar chart)
    const petChartData = {
        labels: petDistribution.map(p => p._id.charAt(0).toUpperCase() + p._id.slice(1)),
        datasets: [
            {
                label: "Number of Pets",
                data: petDistribution.map(p => p.count),
                backgroundColor: [
                    "#6bb7cc", // Primary blue for available pets
                    "#10B981", // Green for adopted pets
                    "#f8b679", // Secondary orange for pending pets
                ],
                borderColor: [
                    "#6bb7cc",
                    "#10B981",
                    "#f8b679",
                ],
                borderWidth: 2,
            },
        ],
    };

    // Common chart options for both charts
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    // Additional options specific to bar chart
    const barChartOptions = {
        ...chartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                },
                title: {
                    display: true,
                    text: 'Number of Pets'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Pet Status'
                }
            }
        },
    };

    return (
        <div className="admin-dashboard">
            {/* Dashboard header with welcome message */}
            <div className="dashboard-header">
                <h1>Admin Dashboard - PetConnect</h1>
                <p>Welcome back, Admin! Here's your system overview.</p>
            </div>

            {/* Key metrics cards showing platform statistics */}
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number">{overview.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Pets</h3>
                    <p className="stat-number">{overview.totalPets}</p>
                </div>
                <div className="stat-card">
                    <h3>Adoption Requests</h3>
                    <p className="stat-number">{overview.totalAdoptionRequests}</p>
                </div>
                <div className="stat-card">
                    <h3>Organizations</h3>
                    <p className="stat-number">{overview.totalOrganizations}</p>
                </div>
            </div>

            {/* Tab navigation for different admin sections */}
            <div className="tab-navigation">
                <button
                    className={`tab-button ${activeTab === "analytics" ? "active" : ""}`}
                    onClick={() => handleTabChange("analytics")}
                >
                    📊 Analytics
                </button>
                <button
                    className={`tab-button ${activeTab === "users" ? "active" : ""}`}
                    onClick={() => handleTabChange("users")}
                >
                    👥 User Management
                </button>
                <button
                    className={`tab-button ${activeTab === "organizations" ? "active" : ""}`}
                    onClick={() => handleTabChange("organizations")}
                >
                    🏢 Organizations
                </button>
                <button
                    className={`tab-button ${activeTab === "activity" ? "active" : ""}`}
                    onClick={() => handleTabChange("activity")}
                >
                    📋 Activity Logs
                </button>
                <button
                    className={`tab-button ${activeTab === "system" ? "active" : ""}`}
                    onClick={() => handleTabChange("system")}
                >
                    🔧 System Health
                </button>
            </div>

            {/* Main content area that changes based on selected tab */}
            <div className="tab-content">
                {/* Loading indicator shown during data fetching */}
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                        <p>Loading dashboard data...</p>
                    </div>
                )}

                {/* Analytics Tab - Data visualization charts */}
                {activeTab === "analytics" && (
                    <div className="analytics-content">
                        <div className="charts-grid">
                            <div className="chart-card">
                                <h3>User Distribution by Role</h3>
                                <div className="chart-wrapper">
                                    <Doughnut
                                        data={userChartData}
                                        options={chartOptions}
                                    />
                                </div>
                                <p className="chart-description">
                                    Breakdown of users by their roles in the PetConnect platform.
                                </p>
                            </div>

                            <div className="chart-card">
                                <h3>Pet Status Distribution</h3>
                                <div className="chart-wrapper">
                                    <Bar
                                        data={petChartData}
                                        options={barChartOptions}
                                    />
                                </div>
                                <p className="chart-description">
                                    Current status of all pets in the system (available, adopted, or pending).
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Management Tab - User administration tools */}
                {activeTab === "users" && (
                    <div className="users-content">
                        <div className="content-header">
                            <h2>User Management</h2>
                            <div className="filters">
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
                                    className="search-input"
                                />
                                <select className="filter-select">
                                    <option value="all">All Roles</option>
                                    <option value="adopter">Adopter</option>
                                    <option value="staff">Staff</option>
                                    <option value="vet">Vet</option>
                                    <option value="trainer">Trainer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="users-list">
                            {users.map(user => (
                                <div key={user._id} className="user-card">
                                    <div className="user-info">
                                        <h3 className="user-name">{user.name}</h3>
                                        <p className="user-email">{user.email}</p>
                                        <div className="user-tags">
                                            <span className="role-tag">{user.role}</span>
                                            <span className={`status-tag ${user.status}`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="user-actions">
                                        <button
                                            className="admin-btn-secondary"
                                            onClick={() => updateUserRole(user._id, user.role)}
                                        >
                                            Change Role
                                        </button>
                                        <button
                                            className="admin-btn-danger"
                                            onClick={() => deleteUser(user._id, user.name)}
                                            disabled={user.role === 'admin'}
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Organizations Tab - Partner organization management */}
                {activeTab === "organizations" && (
                    <div className="organizations-content">
                        <h2>Partner Organizations</h2>
                        <p className="section-description">
                            Manage shelters, rescue groups, and other partner organizations in the PetConnect network.
                        </p>
                        <div className="organizations-list">
                            {organizations.map(org => (
                                <div key={org._id} className="organization-card">
                                    <h3 className="org-name">{org.name}</h3>
                                    <p className="org-type">Type: {org.type}</p>
                                    {org.contact && (
                                        <div className="org-contact">
                                            <p><strong>Contact Information:</strong></p>
                                            {org.contact.email && <p>📧 Email: {org.contact.email}</p>}
                                            {org.contact.phone && <p>📞 Phone: {org.contact.phone}</p>}
                                        </div>
                                    )}
                                    <div className="org-actions">
                                        <button className="admin-btn-secondary">View Details</button>
                                        <button className="admin-btn-primary">Edit Organization</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Activity Logs Tab - System activity monitoring */}
                {activeTab === "activity" && (
                    <div className="activity-content">
                        <h2>System Activity Logs</h2>
                        <p className="section-description">
                            Recent system activities and user actions across the PetConnect platform.
                        </p>
                        <div className="activity-table-container">
                            <table className="activity-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                        <th>Target</th>
                                        <th>Details</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activityLogs.map(log => (
                                        <tr key={log._id}>
                                            <td className="user-cell">{log.user?.name || "System"}</td>
                                            <td className="role-cell">{log.user?.role || "N/A"}</td>
                                            <td className="action-cell">{log.action}</td>
                                            <td className="target-cell">{log.target || "-"}</td>
                                            <td className="details-cell">{log.details || "-"}</td>
                                            <td className="timestamp">
                                                {new Date(log.createdAt).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* System Health Tab - Platform status monitoring */}
                {activeTab === "system" && (
                    <div className="system-content">
                        <h2>System Health & Status</h2>
                        <p className="section-description">
                            Current status of PetConnect platform services and components.
                        </p>
                        <div className="health-cards">
                            <div className="health-card">
                                <h3>Service Status</h3>
                                <div className="health-items">
                                    <div className="health-item">
                                        <span>Database Connection:</span>
                                        <span className={`status-badge ${systemHealth.healthChecks.database}`}>
                                            {systemHealth.healthChecks.database}
                                        </span>
                                    </div>
                                    <div className="health-item">
                                        <span>Authentication Service:</span>
                                        <span className={`status-badge ${systemHealth.healthChecks.authentication}`}>
                                            {systemHealth.healthChecks.authentication}
                                        </span>
                                    </div>
                                    <div className="health-item">
                                        <span>File Storage:</span>
                                        <span className={`status-badge ${systemHealth.healthChecks.fileStorage}`}>
                                            {systemHealth.healthChecks.fileStorage}
                                        </span>
                                    </div>
                                    <div className="health-item">
                                        <span>Email Service:</span>
                                        <span className={`status-badge ${systemHealth.healthChecks.emailService}`}>
                                            {systemHealth.healthChecks.emailService}
                                        </span>
                                    </div>
                                    <div className="health-item">
                                        <span>Server Uptime:</span>
                                        <span>{Math.floor(systemHealth.uptime / 3600)} hours {Math.floor((systemHealth.uptime % 3600) / 60)} minutes</span>
                                    </div>
                                    <div className="health-item">
                                        <span>Last Health Check:</span>
                                        <span>{new Date(systemHealth.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="health-card">
                                <h3>System Information</h3>
                                <div className="health-items">
                                    <div className="health-item">
                                        <span>Platform Version:</span>
                                        <span>PetConnect v2.1.0</span>
                                    </div>
                                    <div className="health-item">
                                        <span>Total Users:</span>
                                        <span>{overview.totalUsers} registered</span>
                                    </div>
                                    <div className="health-item">
                                        <span>Active Pets:</span>
                                        <span>{overview.totalPets} in system</span>
                                    </div>
                                    <div className="health-item">
                                        <span>Partner Organizations:</span>
                                        <span>{overview.totalOrganizations} partners</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;