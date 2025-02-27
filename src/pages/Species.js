import React, { useEffect, useState } from "react";
import SpeciesForm from "../components/SpeciesForm";
import { fetchSpecies, addSpecies, deleteSpecies } from "../api";

function Species() {
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    fetchSpecies().then((response) => setSpeciesList(response.data));
  }, []);

  const handleAddSpecies = (newSpecies) => {
    addSpecies(newSpecies).then(() => {
      fetchSpecies().then((response) => setSpeciesList(response.data));
    });
  };

  const handleDeleteSpecies = (id) => {
    deleteSpecies(id).then(() => {
      fetchSpecies().then((response) => setSpeciesList(response.data));
    });
  };

  return (
    <div>
      <h2>Species</h2>
      <SpeciesForm onAddSpecies={handleAddSpecies} />

      <ul>
        {speciesList.map((species) => (
          <li key={species.id}>
            {species.name}
            <button onClick={() => handleDeleteSpecies(species.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Species;
