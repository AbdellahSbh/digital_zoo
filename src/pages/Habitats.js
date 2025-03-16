import React, { useEffect, useState } from "react";
import { getHabitats, addHabitat } from "../api";

function Habitats() {
  const [habitatList, setHabitatList] = useState([]);  // ✅ Ensure it's always an array
  const [newHabitat, setNewHabitat] = useState({ name: "", description: "" });

  useEffect(() => {
    getHabitats()
      .then((data) => {
        console.log("✅ Habitats API Response:", data);  
        setHabitatList(Array.isArray(data) ? data : []);  // ✅ Ensures it's always an array
      })
      .catch((error) => console.error("❌ Error fetching habitats:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabitat(newHabitat).then(() => {
      getHabitats().then((data) => setHabitatList(Array.isArray(data) ? data : []));
    });
  };

  return (
    <div>
      <h2><span role="img" aria-label="Habitat">🌿</span> Habitat Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Habitat Name" value={newHabitat.name} onChange={(e) => setNewHabitat({ ...newHabitat, name: e.target.value })} required />
        <input type="text" placeholder="Description" value={newHabitat.description} onChange={(e) => setNewHabitat({ ...newHabitat, description: e.target.value })} required />
        <button type="submit">Add Habitat</button>
      </form>

      <h3>Existing Habitats</h3>
      {habitatList.length > 0 ? (
        <ul>
          {habitatList.map((habitat) => (
            <li key={habitat.id}>
              <strong>{habitat.name}</strong> - {habitat.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No habitats available.</p>
      )}
    </div>
  );
}

export default Habitats;
