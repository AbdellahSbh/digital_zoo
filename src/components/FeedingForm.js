import React, { useEffect, useState } from "react";
import { getAnimals, addFeedingSchedule } from "../api";

function FeedingForm({ onAddFeeding }) {
  const [animalList, setAnimalList] = useState([]);  
  const [feeding, setFeeding] = useState({ animal: "", time: "", food: "" });

  useEffect(() => {
    getAnimals()
      .then((data) => {
        console.log("✅ Animals API Response:", data);
        setAnimalList(Array.isArray(data) ? data : []);  
      })
      .catch((error) => console.error("❌ Error fetching animals:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFeeding(feeding);
    setFeeding({ animal: "", time: "", food: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🍽 Add Feeding Schedule</h3>

      <select value={feeding.animal} onChange={(e) => setFeeding({ ...feeding, animal: e.target.value })} required>
        <option value="">Select an Animal</option>
        {animalList.length > 0 ? (
          animalList.map((animal) => (
            <option key={animal.id} value={animal.id}>{animal.name}</option>
          ))
        ) : (
          <option disabled>❌ No animals available</option>
        )}
      </select>

      <input type="time" value={feeding.time} onChange={(e) => setFeeding({ ...feeding, time: e.target.value })} required />
      <input type="text" placeholder="Food" value={feeding.food} onChange={(e) => setFeeding({ ...feeding, food: e.target.value })} required />
      <button type="submit">✅ Add Feeding</button>
    </form>
  );
}

export default FeedingForm;
