import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profile.css";

export default function Profile() {
  // -------------------------------
  // Mock user data (replace with backend data)
  // -------------------------------
  const [user, setUser] = useState({
    name: "Haimanyu",
    email: "haimanyu@email.com",
    role: "Adopter",
    joined: "March 2025",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // -------------------------------
  // Avatar upload preview
  // -------------------------------
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  // -------------------------------
  // Mock API Save Simulation
  // -------------------------------
  const handleSave = async () => {
    setIsSaving(true);

    // 👇 Replace this block later with actual backend update call
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    setUser((prev) => ({
      ...prev,
      avatar: preview || prev.avatar,
    }));

    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="profile-page bg-gradient">
      <Header />

      <main className="profile-container">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* -------------------------------
              Avatar Section
          --------------------------------*/}
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img
                src={preview || user.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="avatar-image"
              />
              <label className="avatar-overlay">
                Change Photo
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-role">{user.role}</p>
          </div>

          {/* -------------------------------
              User Info Section
          --------------------------------*/}
          <div className="info-section">
            <div className="info-item">
              <label>Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="edit-input"
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>

            <div className="info-item">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="edit-input"
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>

            <div className="info-item">
              <label>Role:</label>
              <span>{user.role}</span>
            </div>

            <div className="info-item">
              <label>Joined:</label>
              <span>{user.joined}</span>
            </div>
          </div>

          {/* -------------------------------
              Buttons Section
          --------------------------------*/}
          <div className="button-group">
            {!isEditing ? (
              <motion.button
                className="edit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Info
              </motion.button>
            ) : (
              <motion.button
                className="save-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "💾 Saving..." : "💾 Save Changes"}
              </motion.button>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
