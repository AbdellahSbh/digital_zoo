import React, { useState, useEffect } from "react";
import { getHabitats, getSpecies, addAnimal } from "../api";  // ✅ Fetch from API

function AnimalForm({ onAddAnimal }) {
    const [name, setName] = useState("");
    const [lifeSpan, setLifeSpan] = useState("");
    const [speciesList, setSpeciesList] = useState([]);
    const [habitatList, setHabitatList] = useState([]);
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [selectedHabitat, setSelectedHabitat] = useState("");

    // ✅ Fetch habitats and species when the form loads
    useEffect(() => {
        getHabitats().then((response) => setHabitatList(response.data));
        getSpecies().then((response) => setSpeciesList(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Ensure all fields are filled before submission
        if (!name.trim() || !selectedSpecies || !selectedHabitat || !lifeSpan) {
            alert("Please fill in all fields before adding an animal.");
            return;
        }

        const newAnimal = {
            name,
            species: selectedSpecies,
            habitat: selectedHabitat,
            life_span: lifeSpan,
        };

        addAnimal(newAnimal)
            .then(() => {
                onAddAnimal(newAnimal);  // ✅ Refresh the list
                setName("");
                setLifeSpan("");
                setSelectedSpecies("");
                setSelectedHabitat("");
            })
            .catch((error) => console.error("Error adding animal:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>🐾 Add New Animal</h3>
            <input
                type="text"
                placeholder="Animal Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Life Span (years)"
                value={lifeSpan}
                onChange={(e) => setLifeSpan(e.target.value)}
                required
            />

            {/* ✅ Dropdown for Species */}
            <select value={selectedSpecies} onChange={(e) => setSelectedSpecies(e.target.value)} required>
                <option value="">Select Species</option>
                {speciesList.map((species) => (
                    <option key={species.id} value={species.id}>
                        {species.name}
                    </option>
                ))}
            </select>

            {/* ✅ Dropdown for Habitat */}
            <select value={selectedHabitat} onChange={(e) => setSelectedHabitat(e.target.value)} required>
                <option value="">Select Habitat</option>
                {habitatList.map((habitat) => (
                    <option key={habitat.id} value={habitat.id}>
                        {habitat.name}
                    </option>
                ))}
            </select>

            <button type="submit">✅ Add Animal</button>
        </form>
    );
}

export default AnimalForm;
