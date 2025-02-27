import React, { useState, useEffect } from "react";
import { fetchFeedingSchedules, addFeedingSchedule, addAnimal } from "../api"; 
import axios from "axios";


addAnimal({ name: "Lion", life_span: 15 }).then((response) => {
    console.log(response.data);
});


fetchFeedingSchedules().then((response) => {
    console.log(response.data);
});


const FeedingForm = ({ onAddFeeding }) => {
    const [animals, setAnimals] = useState([]);
    const [animalId, setAnimalId] = useState("");
    const [time, setTime] = useState("");
    const [food, setFood] = useState("");

    useEffect(() => {
        axios.get("/api/animals/").then((response) => {
            setAnimals(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddFeeding({ animal: animalId, time, food });
        setAnimalId("");
        setTime("");
        setFood("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Feeding Schedule</h3>

            {/* Dropdown to select existing animal */}
            <select value={animalId} onChange={(e) => setAnimalId(e.target.value)} required>
                <option value="">Select an Animal</option>
                {animals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                        {animal.name}
                    </option>
                ))}
            </select>

            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <input type="text" placeholder="Food" value={food} onChange={(e) => setFood(e.target.value)} required />
            <button type="submit">Add Feeding</button>
        </form>
    );
};

export default FeedingForm;
