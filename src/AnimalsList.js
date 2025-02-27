import React, { useEffect, useState } from "react";
import { fetchAnimals, fetchHabitats, fetchSpecies, fetchFeedingSchedules } from "./api";

const AnimalsList = () => {
    const [animals, setAnimals] = useState([]);
    const [habitats, setHabitats] = useState([]);
    const [species, setSpecies] = useState([]);
    const [feedingSchedules, setFeedingSchedules] = useState([]);

    useEffect(() => {
        fetchAnimals().then(setAnimals);
        fetchHabitats().then(setHabitats);
        fetchSpecies().then(setSpecies);
        fetchFeedingSchedules().then(setFeedingSchedules);
    }, []);

    return (
        <div>
            <h2>Animal List</h2>
            <ul>
                {animals.map(animal => (
                    <li key={animal.id}>
                        {animal.name} - {animal.life_span} years
                    </li>
                ))}
            </ul>

            <h2>Habitats</h2>
            <ul>
                {habitats.map(habitat => (
                    <li key={habitat.id}>
                        {habitat.name} - {habitat.description}
                    </li>
                ))}
            </ul>

            <h2>Species</h2>
            <ul>
                {species.map(species => (
                    <li key={species.id}>{species.name}</li>
                ))}
            </ul>

            <h2>Feeding Schedules</h2>
            <ul>
                {feedingSchedules.map(schedule => (
                    <li key={schedule.id}>
                        {schedule.animal} - {schedule.feeding_time} - {schedule.food_type}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimalsList;
