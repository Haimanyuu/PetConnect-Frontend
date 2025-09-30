import React from "react";
import { useNavigate } from "react-router-dom";

function LocationPage() {
  const navigate = useNavigate();

  return (
    <div className="app-container bg-gradient animate-fade-in">
      <div className="card animate-slide-down">
        <h2 className="title">Where are you located?</h2>
        <input
          type="text"
          placeholder="Enter your city, postal code, or address"
          className="input-field"
        />
        <button className="btn btn-secondary mb-3">Use My Current Location</button>
        <button className="btn btn-primary" onClick={() => navigate("/matches")}>
          Continue
        </button>
        <p className="subtitle mt-2">Your location is used to find nearby pets and shelters.</p>
      </div>
    </div>
  );
}

export default LocationPage;
