import React, { useEffect, useState } from "react";
import AnimalForm from "../components/AnimalForm";
import { getAnimals, addAnimal, deleteAnimal } from "../api";
import "./Animals.css"; // ✅ Ensure this file exists

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAnimals().then((response) => setAnimals(response.data));
  }, []);

  const handleAddAnimal = (newAnimal) => {
    addAnimal(newAnimal).then(() => {
      getAnimals().then((response) => setAnimals(response.data));
    });
  };

  const handleDeleteAnimal = (id) => {
    deleteAnimal(id).then(() => {
      getAnimals().then((response) => setAnimals(response.data));
    });
  };

  return (
    <div className="page-container">
      <h2>🐾 Animal Management</h2>
      <AnimalForm onAddAnimal={handleAddAnimal} />

      <h3>Current Animals</h3>
      <ul className="animal-list">
        {animals.map((animal) => (
          <li key={animal.id} className="animal-item">
            <strong>{animal.name}</strong> - {animal.life_span} years
            <button className="delete-button" onClick={() => handleDeleteAnimal(animal.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Animals;
