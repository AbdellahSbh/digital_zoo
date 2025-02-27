import React, { useState, useEffect } from "react";
import { fetchHabitats, addHabitat } from "../api";

const Habitats = () => {
    const [habitats, setHabitats] = useState([]);
    const [name, setName] = useState(""); // ✅ Define name
    const [description, setDescription] = useState(""); // ✅ Define description

    useEffect(() => {
        fetchHabitats()
            .then((response) => setHabitats(response.data))
            .catch((error) => console.error("Error fetching habitats:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const habitatData = { name, description };

        console.log("Submitting Habitat:", habitatData); // Debugging log

        addHabitat(habitatData)
            .then((response) => {
                console.log("API Response:", response.data);
                setHabitats([...habitats, response.data]);
                setName(""); // ✅ Reset input
                setDescription(""); // ✅ Reset input
            })
            .catch((error) => {
                console.error("Error adding habitat:", error.response?.data || error);
            });
    };

    return (
        <div>
            <h2>Habitats</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Habitat Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Habitat</button>
            </form>
            <ul>
                {habitats.map((habitat) => (
                    <li key={habitat.id}>{habitat.name} - {habitat.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default Habitats;
