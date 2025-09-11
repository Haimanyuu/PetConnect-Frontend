import { useParams, useNavigate } from "react-router-dom";
import "../App.css"; // make sure your path is correct

const dummyPets = {
  buddy: {
    name: "Buddy",
    type: "Dog",
    age: "2 years",
    description:
      "Buddy is a friendly and energetic dog who loves to play fetch and go for walks.",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=500&q=80",
  },
  luna: {
    name: "Luna",
    type: "Cat",
    age: "1 year",
    description:
      "Luna is a calm and affectionate cat who enjoys lounging in sunny spots.",
    image:
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=500&q=80",
  },
};

type PetId = keyof typeof dummyPets;

function PetProfile() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();

  const petKey = petId?.toLowerCase() as PetId;
  const pet = petKey && dummyPets.hasOwnProperty(petKey) ? dummyPets[petKey] : undefined;

  if (!pet) {
    return (
      <div className="app-container">
        <div className="card animate-fade-in">
          <p>Pet not found.</p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card animate-fade-in">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
          style={{ marginBottom: "1rem" }}
        >
          ← Back
        </button>

        <img
          src={pet.image}
          alt={pet.name}
          style={{ width: "100%", borderRadius: "12px", marginBottom: "1rem" }}
        />

        <h1 className="title">{pet.name}</h1>
        <h3 style={{ marginBottom: "1rem" }}>
          {pet.type} · {pet.age}
        </h3>
        <p style={{ marginBottom: "2rem" }}>{pet.description}</p>

        <button
          className="btn btn-primary"
          onClick={() => alert("Contact owner feature coming soon!")}
        >
          Contact Owner
        </button>
      </div>
    </div>
  );
}

export default PetProfile;
