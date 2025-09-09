import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IntentSelection() {
  const navigate = useNavigate();
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const handleSelect = (intent: string) => {
    setSelectedIntent(intent);
  };

  const handleNext = () => {
    if (!selectedIntent) {
      alert("Please select an option to continue");
      return;
    }
    // Optionally pass selectedIntent in URL query or context
    navigate("/location");
  };

  const optionStyle = (isSelected: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: isSelected ? "2px solid #f28c28" : "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    cursor: "pointer",
    backgroundColor: isSelected ? "#fff4e6" : "#fff",
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        What brings you to PetConnect today?
      </h2>

      <div onClick={() => handleSelect("Adopt a Pet")} style={optionStyle(selectedIntent === "Adopt a Pet")}>
        <div>
          <strong>Adopt a Pet</strong>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Find your new furry friend and give them a loving home.
          </p>
        </div>
        <img src="/adopt-icon.png" alt="Adopt" width={50} />
      </div>

      <div onClick={() => handleSelect("Foster a Pet")} style={optionStyle(selectedIntent === "Foster a Pet")}>
        <div>
          <strong>Foster a Pet</strong>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Provide temporary care for a pet in need.
          </p>
        </div>
        <img src="/foster-icon.png" alt="Foster" width={50} />
      </div>

      <div onClick={() => handleSelect("Find Care for My Pet")} style={optionStyle(selectedIntent === "Find Care for My Pet")}>
        <div>
          <strong>Find Care for My Pet</strong>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Connect with sitters & walkers to care for your pet.
          </p>
        </div>
        <img src="/care-icon.png" alt="Care" width={50} />
      </div>

      <button
        onClick={handleNext}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#f28c28",
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "1rem",
          width: "100%",
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default IntentSelection;
