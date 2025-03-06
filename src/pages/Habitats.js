import React, { useState, useEffect } from "react";
import { getHabitats, addHabitat } from "../api"; // ✅ Correct API imports
import HabitatForm from "../components/HabitatForm";

function Habitats() {
    const [habitats, setHabitats] = useState([]);

    // ✅ Define function BEFORE useEffect calls it
    const fetchAllHabitats = () => {
        getHabitats()
            .then((response) => setHabitats(response.data))
            .catch((error) => console.error("Error fetching habitats:", error));
    };

    useEffect(() => {
        fetchAllHabitats();
    }, []);

    const handleAddHabitat = (habitatData) => {
        addHabitat(habitatData)
            .then(() => fetchAllHabitats()) // ✅ Refresh the list after adding
            .catch((error) => console.error("Error adding habitat:", error.response?.data || error));
    };

    return (
        <div>
            <h2>🌿 Habitat Management</h2>
            <HabitatForm onAddHabitat={handleAddHabitat} />

            <h3>Existing Habitats</h3>
            {habitats.length > 0 ? (
                <ul>
                    {habitats.map((habitat) => (
                        <li key={habitat.id}>
                            <strong>{habitat.name}</strong> - {habitat.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No habitats found.</p>
            )}
        </div>
    );
}

export default Habitats;
