import { Link } from "react-router-dom";

const pets = [
  { id: "buddy", name: "Buddy", type: "Dog", age: "2 years", distance: "1.2 miles" },
  { id: "whiskers", name: "Whiskers", type: "Cat", age: "1 year", distance: "2.5 miles" },
  { id: "max", name: "Max", type: "Dog", age: "3 years", distance: "3.1 miles" },
  { id: "mittens", name: "Mittens", type: "Cat", age: "6 months", distance: "4.8 miles" },
];

function Matches() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pets.map((pet) => (
          <div key={pet.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <p>{pet.type} · {pet.age}</p>
            <p className="text-gray-500">{pet.distance} away</p>
            <Link
              to={`/pet/${pet.id}`}
              className="mt-2 inline-block bg-green-500 text-white px-3 py-1 rounded"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
