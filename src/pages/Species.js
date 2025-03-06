import React, { useEffect, useState } from "react";
import SpeciesForm from "../components/SpeciesForm";
import { getSpecies, addSpecies, deleteSpecies } from "../api"; // ✅ Fixed API function names

function Species() {
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    fetchSpeciesList();
  }, []);

  const fetchSpeciesList = () => {
    getSpecies()
      .then((response) => setSpeciesList(response.data))
      .catch((error) => console.error("Error fetching species:", error));
  };

  const handleAddSpecies = (newSpecies) => {
    addSpecies(newSpecies)
      .then((response) => {
        setSpeciesList([...speciesList, response.data]); // ✅ Updates locally without re-fetching everything
      })
      .catch((error) => console.error("Error adding species:", error));
  };

  const handleDeleteSpecies = (id) => {
    deleteSpecies(id)
      .then(() => {
        setSpeciesList(speciesList.filter((species) => species.id !== id)); // ✅ Removes locally
      })
      .catch((error) => console.error("Error deleting species:", error));
  };

  return (
    <div>
      <h2>🦁 Species Management</h2>
      <SpeciesForm onAddSpecies={handleAddSpecies} />

      <h3>Existing Species</h3>
      {speciesList.length > 0 ? (
        <ul>
          {speciesList.map((species) => (
            <li key={species.id}>
              <strong>{species.name}</strong>
              <button 
                onClick={() => handleDeleteSpecies(species.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No species found.</p>
      )}
    </div>
  );
}

export default Species;
