import React, { useEffect, useState } from "react";
import AnimalForm from "../components/AnimalForm";
import { fetchAnimals, addAnimal, deleteAnimal } from "../api";

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetchAnimals().then((response) => setAnimals(response.data));
  }, []);

  const handleAddAnimal = (newAnimal) => {
    addAnimal(newAnimal).then(() => {
      fetchAnimals().then((response) => setAnimals(response.data));
    });
  };

  const handleDeleteAnimal = (id) => {
    deleteAnimal(id).then(() => {
      fetchAnimals().then((response) => setAnimals(response.data));
    });
  };

  return (
    <div>
      <h2>Animal List</h2>
      <AnimalForm onAddAnimal={handleAddAnimal} />

      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            {animal.name} - {animal.lifespan} years
            <button onClick={() => handleDeleteAnimal(animal.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Animals;
