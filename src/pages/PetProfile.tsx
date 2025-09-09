import { useParams, useNavigate } from "react-router-dom";

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

  // Convert petId to lowercase and assert as PetId
  const petKey = petId?.toLowerCase() as PetId;

  // Check if petKey exists in dummyPets
  const pet = petKey && dummyPets.hasOwnProperty(petKey) ? dummyPets[petKey] : undefined;

  if (!pet) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Pet not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Back
      </button>
      <img
        src={pet.image}
        alt={pet.name}
        style={{ width: "100%", borderRadius: "12px", marginBottom: "1rem" }}
      />
      <h1>{pet.name}</h1>
      <h3>
        {pet.type} · {pet.age}
      </h3>
      <p style={{ marginTop: "1rem" }}>{pet.description}</p>
      <button
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => alert("Contact owner feature coming soon!")}
      >
        Contact Owner
      </button>
    </div>
  );
}

export default PetProfile;
