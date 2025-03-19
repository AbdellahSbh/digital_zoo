import React, { useEffect, useState } from "react";
import { getSpecies, getHabitats, addAnimal } from "../api";

function AnimalForm({ onAddAnimal }) {
  const [speciesList, setSpeciesList] = useState([]);  
  const [habitatList, setHabitatList] = useState([]);  
  const [animal, setAnimal] = useState({ name: "", species: "", habitat: "", life_span: "" });

  useEffect(() => {
    getSpecies()
      .then((data) => {
        console.log("✅ Species Data:", data);  
        setSpeciesList(data || []);  
      })
      .catch((error) => console.error("❌ Error fetching species:", error));

    getHabitats()
      .then((data) => {
        console.log("✅ Habitats Data:", data);
        setHabitatList(data || []);  
      })
      .catch((error) => console.error("❌ Error fetching habitats:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAnimal(animal);
    setAnimal({ name: "", species: "", habitat: "", life_span: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>➕ Add Animal</h3>
      <input type="text" placeholder="Animal Name" value={animal.name} onChange={(e) => setAnimal({ ...animal, name: e.target.value })} required />
      
      <select value={animal.species} onChange={(e) => setAnimal({ ...animal, species: e.target.value })} required>
        <option value="">Select Species</option>
        {speciesList.length > 0 ? (
          speciesList.map((species) => (
            <option key={species.id} value={species.id}>{species.name}</option>
          ))
        ) : (
          <option disabled>❌ No species available</option>
        )}
      </select>

      <select value={animal.habitat} onChange={(e) => setAnimal({ ...animal, habitat: e.target.value })} required>
        <option value="">Select Habitat</option>
        {habitatList.length > 0 ? (
          habitatList.map((habitat) => (
            <option key={habitat.id} value={habitat.id}>{habitat.name}</option>
          ))
        ) : (
          <option disabled>❌ No habitats available</option>
        )}
      </select>

      <input type="number" placeholder="Lifespan (years)" value={animal.life_span} onChange={(e) => setAnimal({ ...animal, life_span: e.target.value })} required />
      <button type="submit">✅ Add Animal</button>
    </form>
  );
}

export default AnimalForm;
