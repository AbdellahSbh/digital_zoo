import React, { useEffect, useState } from "react";
import AnimalForm from "../components/AnimalForm";
import { getAnimals, addAnimal } from "../api";

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getAnimals()
      .then((response) => {
        console.log("✅ Animals API Response:", response.data);  // Debugging log
        setAnimals(response.data || []);  
      })
      .catch((error) => console.error("❌ Error fetching animals:", error));
  }, []);

  const handleAddAnimal = (newAnimal) => {
    addAnimal(newAnimal).then(() => {
      getAnimals().then((response) => setAnimals(response.data || []));
    });
  };

  return (
    <div>
      <h2>🦁 Animal List</h2>
      <AnimalForm onAddAnimal={handleAddAnimal} />

      <ul>
        {animals.length > 0 ? (
          animals.map((animal) => (
            <li key={animal.id}>
              {animal.name} - {animal.life_span} years
            </li>
          ))
        ) : (
          <p>❌ No animals available.</p>
        )}
      </ul>
    </div>
  );
}

export default Animals;
