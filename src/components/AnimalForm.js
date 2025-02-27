import React, { useState, useEffect } from "react";
import { fetchHabitats, fetchSpecies } from "../api"; // To populate dropdowns

function AnimalForm({ onAddAnimal }) {
  const [name, setName] = useState("");
  const [lifespan, setLifespan] = useState("");
  const [habitat, setHabitat] = useState("");
  const [species, setSpecies] = useState("");
  const [habitats, setHabitats] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    fetchHabitats().then((response) => setHabitats(response.data));
    fetchSpecies().then((response) => setSpeciesList(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !lifespan.trim() || !habitat || !species) return;
    onAddAnimal({ name, lifespan, habitat, species });
    setName("");
    setLifespan("");
    setHabitat("");
    setSpecies("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Animal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Lifespan (years)"
        value={lifespan}
        onChange={(e) => setLifespan(e.target.value)}
      />

      <select value={habitat} onChange={(e) => setHabitat(e.target.value)}>
        <option value="">Select Habitat</option>
        {habitats.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
          </option>
        ))}
      </select>

      <select value={species} onChange={(e) => setSpecies(e.target.value)}>
        <option value="">Select Species</option>
        {speciesList.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Animal</button>
    </form>
  );
}

export default AnimalForm;
