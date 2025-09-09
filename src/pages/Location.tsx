import { useNavigate } from "react-router-dom";

function LocationPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/matches");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Where are you located?
      </h2>
      <input
        type="text"
        placeholder="Enter your city, postal code, or address"
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      <button
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#eee",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "1.5rem",
          cursor: "pointer",
        }}
      >
        Use My Current Location
      </button>

      <button
        onClick={handleContinue}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#f28c28",
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Continue
      </button>

      <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "1rem" }}>
        Your location is used to find nearby pets and shelters.
      </p>
    </div>
  );
}

export default LocationPage;
