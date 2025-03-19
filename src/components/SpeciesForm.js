import React, { useState } from "react";

function SpeciesForm({ onAddSpecies }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return; 
    onAddSpecies({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🐾 Add New Species</h3>
      <input
        type="text"
        placeholder="Species Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">✅ Add Species</button>
    </form>
  );
}

export default SpeciesForm;
