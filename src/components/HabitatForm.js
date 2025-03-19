import React, { useState } from "react";

function HabitatForm({ onAddHabitat }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; 
    onAddHabitat({ name, description }); 
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🏞 Add New Habitat</h3>
      <input
        type="text"
        placeholder="Habitat Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">✅ Add Habitat</button>
    </form>
  );
}

export default HabitatForm;
