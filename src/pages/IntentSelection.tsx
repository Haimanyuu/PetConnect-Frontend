import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IntentSelection() {
  const navigate = useNavigate();
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const handleSelect = (intent: string) => setSelectedIntent(intent);
  const handleNext = () => {
    if (!selectedIntent) return alert("Please select an option to continue");
    navigate("/location");
  };

  return (
    <div className="app-container bg-gradient animate-fade-in">
      <div className="card animate-slide-down">
        <h2 className="title">What brings you to PetConnect today?</h2>

        {["Adopt a Pet", "Foster a Pet", "Find Care for My Pet"].map((intent) => (
          <div
            key={intent}
            className={`option ${selectedIntent === intent ? "selected" : ""}`}
            onClick={() => handleSelect(intent)}
          >
            <div>
              <strong>{intent}</strong>
              <p className="subtitle">
                {intent === "Adopt a Pet" && "Find your new furry friend and give them a loving home."}
                {intent === "Foster a Pet" && "Provide temporary care for a pet in need."}
                {intent === "Find Care for My Pet" && "Connect with sitters & walkers to care for your pet."}
              </p>
            </div>
            <img
              src={`/icons/${intent.split(" ")[0].toLowerCase()}.png`}
              alt={intent}
              width={50}
            />
          </div>
        ))}

        <button onClick={handleNext} className="btn btn-primary mt-4">
          Continue
        </button>
      </div>
    </div>
  );
}

export default IntentSelection;
