import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./BrowsePets.css";

export default function BrowsePets() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);

  const pets = [
    { id: 1, name: "Bella", type: "Dog", age: "2 years", location: "Toronto", image: "/images/animals/1.jpg" },
    { id: 2, name: "Luna", type: "Cat", age: "1 year", location: "Mississauga", image: "/images/animals/2.jpg" },
    { id: 3, name: "Charlie", type: "Dog", age: "3 years", location: "Brampton", image: "/images/animals/3.jpg" },
    { id: 4, name: "Oliver", type: "Cat", age: "4 months", location: "Oakville", image: "/images/animals/4.jpg" },
    { id: 5, name: "Milo", type: "Rabbit", age: "1 year", location: "Toronto", image: "/images/animals/5.jpg" },
    { id: 6, name: "Max", type: "Dog", age: "5 years", location: "Hamilton", image: "/images/animals/6.jpg" },
    { id: 7, name: "Lucy", type: "Cat", age: "2 years", location: "Burlington", image: "/images/animals/7.jpg" },
    { id: 8, name: "Daisy", type: "Dog", age: "6 months", location: "Toronto", image: "/images/animals/8.jpg" },
    { id: 9, name: "Coco", type: "Parrot", age: "1 year", location: "Milton", image: "/images/animals/9.jpg" },
    { id: 10, name: "Rocky", type: "Dog", age: "4 years", location: "Etobicoke", image: "/images/animals/10.jpg" },
    { id: 11, name: "Chloe", type: "Cat", age: "2 years", location: "Toronto", image: "/images/animals/11.jpg" },
    { id: 12, name: "Nala", type: "Dog", age: "8 months", location: "Brampton", image: "/images/animals/12.jpg" },
    { id: 13, name: "Buddy", type: "Dog", age: "3 years", location: "Hamilton", image: "/images/animals/13.jpg" },
    { id: 14, name: "Lily", type: "Rabbit", age: "2 years", location: "Oakville", image: "/images/animals/14.jpg" },
    { id: 15, name: "Simba", type: "Cat", age: "5 years", location: "Toronto", image: "/images/animals/15.jpg" },
    { id: 16, name: "Zoe", type: "Dog", age: "1 year", location: "Mississauga", image: "/images/animals/16.jpg" },
    { id: 17, name: "Shadow", type: "Dog", age: "6 years", location: "Milton", image: "/images/animals/17.jpg" },
    { id: 18, name: "Oscar", type: "Cat", age: "3 years", location: "Brampton", image: "/images/animals/18.jpg" },
    { id: 19, name: "Snowball", type: "Rabbit", age: "7 months", location: "Toronto", image: "/images/animals/19.jpg" },
    { id: 20, name: "Ruby", type: "Dog", age: "2 years", location: "Etobicoke", image: "/images/animals/20.jpg" },
    { id: 21, name: "Bailey", type: "Dog", age: "4 years", location: "Hamilton", image: "/images/animals/21.jpg" },
    { id: 22, name: "Misty", type: "Cat", age: "1.5 years", location: "Mississauga", image: "/images/animals/22.jpg" },
    { id: 23, name: "Peanut", type: "Hamster", age: "8 months", location: "Toronto", image: "/images/animals/23.jpg" },
    { id: 24, name: "Rosie", type: "Dog", age: "5 years", location: "Oakville", image: "/images/animals/24.jpg" },
    { id: 25, name: "Mango", type: "Parrot", age: "2 years", location: "Burlington", image: "/images/animals/25.jpg" },
    { id: 26, name: "Cleo", type: "Cat", age: "1 year", location: "Hamilton", image: "/images/animals/26.png" },
    { id: 27, name: "Mocha", type: "Dog", age: "7 months", location: "Brampton", image: "/images/animals/27.png" },
    { id: 28, name: "Jack", type: "Dog", age: "6 years", location: "Toronto", image: "/images/animals/28.jpg" },
    { id: 29, name: "Hazel", type: "Cat", age: "3 years", location: "Mississauga", image: "/images/animals/29.jpg" },
    { id: 30, name: "Toby", type: "Dog", age: "2 years", location: "Oakville", image: "/images/animals/30.jpg" }
  ];

  const filteredPets = pets.filter(
    (pet) =>
      (pet.name.toLowerCase().includes(search.toLowerCase()) ||
       pet.type.toLowerCase().includes(search.toLowerCase()) ||
       pet.location.toLowerCase().includes(search.toLowerCase())) &&
      (typeFilter === "" || pet.type === typeFilter) &&
      (ageFilter === "" || pet.age === ageFilter) &&
      (locationFilter === "" || pet.location === locationFilter)
  );

  const uniqueTypes = [...new Set(pets.map(p => p.type))];
  const uniqueAges = [...new Set(pets.map(p => p.age))];
  const uniqueLocations = [...new Set(pets.map(p => p.location))];

  return (
    <div className="browse-page">
      <Header />

      <main className="browse-main">
        <section className="hero-section">
          <div className="hero-text">
            <h1>Discover Your Perfect Pet</h1>
            <p>Find pets for adoption near you — loving homes start here.</p>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search pets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
              <option value="">All Types</option>
              {uniqueTypes.map(type => <option key={type}>{type}</option>)}
            </select>

            <select onChange={(e) => setAgeFilter(e.target.value)} value={ageFilter}>
              <option value="">All Ages</option>
              {uniqueAges.map(age => <option key={age}>{age}</option>)}
            </select>

            <select onChange={(e) => setLocationFilter(e.target.value)} value={locationFilter}>
              <option value="">All Locations</option>
              {uniqueLocations.map(loc => <option key={loc}>{loc}</option>)}
            </select>
          </div>
        </section>

        <section className="pet-grid">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div key={pet.id} className="pet-card">
                <img src={pet.image} alt={pet.name} className="pet-img" />
                <div className="pet-details">
                  <h3>{pet.name}</h3>
                  <p className="type-age">{pet.type} • {pet.age}</p>
                  <p className="location">{pet.location}</p>
                  <button className="btn-primary" onClick={() => setSelectedPet(pet)}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No pets found matching your search.</p>
          )}
        </section>
      </main>

      <Footer />

      {/* Modal */}
      {selectedPet && (
        <div className="modal-overlay" onClick={() => setSelectedPet(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelectedPet(null)}>
              &times;
            </span>
            <img src={selectedPet.image} alt={selectedPet.name} className="modal-img" />
            <h2>{selectedPet.name}</h2>
            <p><strong>Type:</strong> {selectedPet.type}</p>
            <p><strong>Age:</strong> {selectedPet.age}</p>
            <p><strong>Location:</strong> {selectedPet.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}
