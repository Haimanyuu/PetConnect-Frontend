import { Link } from "react-router-dom";

const pets = [
  { id: "buddy", name: "Buddy", type: "Dog", age: "2 years", distance: "1.2 miles" },
  { id: "whiskers", name: "Whiskers", type: "Cat", age: "1 year", distance: "2.5 miles" },
  { id: "max", name: "Max", type: "Dog", age: "3 years", distance: "3.1 miles" },
  { id: "mittens", name: "Mittens", type: "Cat", age: "6 months", distance: "4.8 miles" },
];

function Matches() {
  return (
    <div className="app-container bg-gradient">
      <div className="card animate-fade-in">
        <h2 className="title mb-4">Your Matches</h2>
        <div className="matches-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="match-card">
              <h3 className="subtitle">{pet.name}</h3>
              <p>{pet.type} · {pet.age}</p>
              <p className="subtitle">{pet.distance} away</p>
              <Link to={`/pet/${pet.id}`} className="btn btn-primary mt-2">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Matches;
