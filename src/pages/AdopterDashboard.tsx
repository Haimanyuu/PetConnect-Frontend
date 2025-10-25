import React, { useState, useEffect } from "react";
import "./AdopterDashboard.css";

// Sample data matching backend structure
const samplePets = [
    {
        _id: "1",
        name: "Buddy",
        breed: "Golden Retriever",
        status: "Available",
        images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=300"]
    },
    {
        _id: "2",
        name: "Mittens",
        breed: "Tabby Cat",
        status: "Available",
        images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300"]
    },
    {
        _id: "3",
        name: "Charlie",
        breed: "Labrador Mix",
        status: "Available",
        images: []
    },
    {
        _id: "4",
        name: "Luna",
        breed: "Siamese Cat",
        status: "Available",
        images: ["https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300"]
    },
];

const sampleAdoptionRequests = [
    {
        _id: "req1",
        pet: { name: "Buddy", breed: "Golden Retriever" },
        status: "approved",
        meeting: null
    },
    {
        _id: "req2",
        pet: { name: "Mittens", breed: "Tabby Cat" },
        status: "pending",
        meeting: null
    },
    {
        _id: "req3",
        pet: { name: "Luna", breed: "Siamese Cat" },
        status: "meeting",
        meeting: {
            date: "2025-10-20T14:00:00.000Z",
            confirmed: false
        }
    },
    {
        _id: "req4",
        pet: { name: "Max", breed: "German Shepherd" },
        status: "finalized",
        meeting: {
            date: "2025-10-15T10:00:00.000Z",
            confirmed: true
        }
    },
];

const sampleNotifications = [
    {
        _id: "notif1",
        message: "Your adoption request for Buddy has been approved!",
        type: "adoption_approved",
        read: false,
        createdAt: new Date().toISOString()
    },
    {
        _id: "notif2",
        message: "Meeting scheduled for Luna on October 20th",
        type: "meeting_scheduled",
        read: true,
        createdAt: new Date().toISOString()
    }
];

const AdopterDashboard: React.FC = () => {
    const [user, setUser] = useState({ name: "Jivesh Malhotra", email: "jiveshmalhotra748@gmail.com" });
    const [pets, setPets] = useState(samplePets);
    const [adoptionRequests, setAdoptionRequests] = useState(sampleAdoptionRequests);
    const [notifications, setNotifications] = useState(sampleNotifications);
    const [unreadCount, setUnreadCount] = useState(1);
    const [loading, setLoading] = useState(false);

    // Simulate API loading
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Handle adoption request
    const handleAdoptionRequest = async (petId: string) => {
        if (confirm("Are you sure you want to request adoption for this pet?")) {
            alert(`Adoption request submitted for pet ${petId} (API call would be made here)`);
            // In real implementation:
            // await requestAdoptionAPI(petId);
            // loadAdoptionRequests(); // Refresh the list
        }
    };

    // Handle meeting actions
    const confirmMeeting = (requestId: string) => {
        alert(`Meeting confirmed for request ${requestId} (API call would be made here)`);
        // In real implementation: update meeting status via API
    };

    const rescheduleMeeting = (requestId: string) => {
        alert(`To reschedule, please contact the shelter directly via chat or email for request ${requestId}`);
    };

    const viewMeetingDetails = (requestId: string) => {
        alert(`Viewing meeting details for request ${requestId}`);
        // In real implementation: navigate to meeting details page
    };

    const startChat = (requestId: string) => {
        alert(`Chat/Booking flow coming soon for request ${requestId}`);
    };

    // Notification actions
    const markAsRead = (notificationId: string) => {
        setNotifications(notifications.map(notif =>
            notif._id === notificationId ? { ...notif, read: true } : notif
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
        setUnreadCount(0);
    };

    const deleteNotification = (notificationId: string) => {
        const notificationToDelete = notifications.find(notif => notif._id === notificationId);
        if (notificationToDelete && !notificationToDelete.read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
        setNotifications(notifications.filter(notif => notif._id !== notificationId));
    };

    // Get available pets (status === "Available")
    const availablePets = pets.filter(pet => pet.status === "Available");

    return (
        <div className="adopter-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1>Adopter Dashboard</h1>
                <p>Welcome back, {user.name}! Find your perfect pet companion.</p>
            </div>

            {/* Top Bar */}
            <div className="top-bar">
                <div className="user-info">
                    <span className="user-status">Welcome {user.name}</span>
                </div>
                <div className="top-actions">
                    <button className="admin-btn-primary" onClick={() => window.location.href = '/profile'}>
                        👤 My Profile
                    </button>
                    <button
                        className="admin-btn-danger"
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/auth';
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="notifications-section">
                <div className="section-header">
                    <h2>
                        Notifications
                        {unreadCount > 0 && (
                            <span className="unread-badge">{unreadCount}</span>
                        )}
                    </h2>
                    {notifications.length > 0 && (
                        <button className="mark-all-read" onClick={markAllAsRead}>
                            Mark all read
                        </button>
                    )}
                </div>
                <div className="notifications-list">
                    {notifications.length === 0 ? (
                        <div className="no-notifications">
                            <p>No notifications yet</p>
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div
                                key={notification._id}
                                className={`notification-card ${!notification.read ? 'unread' : ''}`}
                            >
                                <div className="notification-content">
                                    <p className="notification-message">{notification.message}</p>
                                    <div className="notification-meta">
                                        <span className="notification-type">
                                            {notification.type.replace('_', ' ')}
                                        </span>
                                        <span className="notification-time">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {!notification.read && (
                                        <button
                                            className="mark-read-btn"
                                            onClick={() => markAsRead(notification._id)}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                                <button
                                    className="delete-notification"
                                    onClick={() => deleteNotification(notification._id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Available Pets Section */}
            <div className="pets-section">
                <h2>Available Pets</h2>
                {loading ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading available pets...</p>
                    </div>
                ) : availablePets.length === 0 ? (
                    <div className="no-pets">
                        <p>No pets available at the moment</p>
                    </div>
                ) : (
                    <div className="pets-grid">
                        {availablePets.map(pet => (
                            <div key={pet._id} className="pet-card">
                                {pet.images && pet.images[0] ? (
                                    <img
                                        src={pet.images[0]}
                                        alt={pet.name}
                                        className="pet-image"
                                    />
                                ) : (
                                    <div className="pet-image-placeholder">
                                        No Image
                                    </div>
                                )}
                                <div className="pet-info">
                                    <h3 className="pet-name">{pet.name}</h3>
                                    <p className="pet-breed">Breed: {pet.breed || "Unknown"}</p>
                                    <p className="pet-status">Status: {pet.status}</p>
                                </div>
                                <button
                                    className="request-adoption-btn"
                                    onClick={() => handleAdoptionRequest(pet._id)}
                                >
                                    Request Adoption
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* My Adoption Requests Section */}
            <div className="requests-section">
                <h2>My Adoption Requests</h2>
                {loading ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading your requests...</p>
                    </div>
                ) : adoptionRequests.length === 0 ? (
                    <div className="no-requests">
                        <p>No adoption requests yet</p>
                    </div>
                ) : (
                    <div className="requests-grid">
                        {adoptionRequests.map(request => (
                            <div key={request._id} className="request-card">
                                <h3 className="request-pet-name">{request.pet.name}</h3>
                                <p className="request-pet-breed">{request.pet.breed || "Unknown"}</p>

                                <div className="request-status">
                                    <span>Status: </span>
                                    <span className={`status-badge status-${request.status}`}>
                                        {request.status}
                                    </span>
                                </div>

                                {/* Action buttons based on status */}
                                <div className="request-actions">
                                    {request.status === "approved" && (
                                        <button
                                            className="action-btn chat-btn"
                                            onClick={() => startChat(request._id)}
                                        >
                                            Chat / Book Meeting
                                        </button>
                                    )}

                                    {request.status === "meeting" && (
                                        <div className="meeting-actions">
                                            <div className="meeting-info">
                                                <p className="meeting-title">📅 Scheduled Meeting</p>
                                                <p className="meeting-time">
                                                    <strong>When:</strong> {request.meeting?.date ? new Date(request.meeting.date).toLocaleString() : 'Not scheduled'}
                                                </p>
                                                <p className="meeting-status">
                                                    <strong>Status:</strong>
                                                    <span className={request.meeting?.confirmed ? 'confirmed' : 'pending'}>
                                                        {request.meeting?.confirmed ? 'Confirmed' : 'Pending Your Confirmation'}
                                                    </span>
                                                </p>
                                            </div>

                                            {!request.meeting?.confirmed ? (
                                                <>
                                                    <button
                                                        className="action-btn confirm-btn"
                                                        onClick={() => confirmMeeting(request._id)}
                                                    >
                                                        ✅ Confirm Meeting
                                                    </button>
                                                    <button
                                                        className="action-btn reschedule-btn"
                                                        onClick={() => rescheduleMeeting(request._id)}
                                                    >
                                                        📅 Request Reschedule
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="action-btn details-btn"
                                                    onClick={() => viewMeetingDetails(request._id)}
                                                >
                                                    📋 View Meeting Details
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {request.status === "finalized" && (
                                        <div className="finalized-badge">
                                            <p>🎉 Adoption Finalized!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Socket Connection Status (for future real-time features) */}
            <div className="socket-status hidden">
                <span>🔔 Real-time updates: </span>
                <span className="status-text">Connecting...</span>
            </div>
        </div>
    );
};

export default AdopterDashboard;