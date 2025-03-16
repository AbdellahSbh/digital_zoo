import React, { useEffect, useState } from "react";
import { getSpecies, addSpecies } from "../api";

function Species() {
  const [speciesList, setSpeciesList] = useState([]);  // ✅ Ensure it's always an array
  const [newSpecies, setNewSpecies] = useState({ name: "" });

  useEffect(() => {
    getSpecies()
      .then((data) => {
        console.log("✅ Species API Response:", data);
        setSpeciesList(Array.isArray(data) ? data : []);  // ✅ Ensure it's always an array
      })
      .catch((error) => console.error("❌ Error fetching species:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addSpecies(newSpecies).then(() => {
      getSpecies().then((data) => setSpeciesList(Array.isArray(data) ? data : []));
    });
  };

  return (
    <div>
      <h2><span role="img" aria-label="Species">🔬</span> Species Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Species Name" value={newSpecies.name} onChange={(e) => setNewSpecies({ name: e.target.value })} required />
        <button type="submit">Add Species</button>
      </form>

      <h3>Existing Species</h3>
      {speciesList.length > 0 ? (
        <ul>
          {speciesList.map((species) => (
            <li key={species.id}>
              <strong>{species.name}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No species available.</p>
      )}
    </div>
  );
}

export default Species;
