import React, { useState, useEffect } from "react";
import { getCareRoutines, addCareRoutine, getAvailableZookeepers, getAnimals } from "../api";
import "./CareRoutinePage.css"; 

function CareRoutinePage() {
    const [careRoutines, setCareRoutines] = useState([]);
    const [zookeepers, setZookeepers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [selectedZookeeper, setSelectedZookeeper] = useState("");
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [taskType, setTaskType] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        getCareRoutines().then((response) => setCareRoutines(response.data));
        getAvailableZookeepers().then((response) => setZookeepers(response.data));
        getAnimals().then((response) => setAnimals(response.data));
    }, []);

    const handleAddCareRoutine = (e) => {
        e.preventDefault();
        addCareRoutine({ zookeeper: selectedZookeeper, animal: selectedAnimal, task_type: taskType, time }).then(() => {
            getCareRoutines().then((response) => setCareRoutines(response.data));
            setSelectedZookeeper("");
            setSelectedAnimal("");
            setTaskType("");
            setTime("");
        });
    };

    return (
        <div className="page-container">
            <h2>📅 Zookeeper Task Assignment</h2>

            <form onSubmit={handleAddCareRoutine}>
                <select value={selectedZookeeper} onChange={(e) => setSelectedZookeeper(e.target.value)} required>
                    <option value="">Select Zookeeper</option>
                    {zookeepers.map((zookeeper) => (
                        <option key={zookeeper.id} value={zookeeper.id}>{zookeeper.name}</option>
                    ))}
                </select>

                <select value={selectedAnimal} onChange={(e) => setSelectedAnimal(e.target.value)} required>
                    <option value="">Select Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>{animal.name}</option>
                    ))}
                </select>

                <select value={taskType} onChange={(e) => setTaskType(e.target.value)} required>
                    <option value="">Select Task</option>
                    <option value="feeding">Feeding</option>
                    <option value="medical">Medical Checkup</option>
                    <option value="cleaning">Cleaning</option>
                </select>

                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

                <button type="submit">➕ Assign Task</button>
            </form>

            <h3>Current Care Routines</h3>
            <ul>
                {careRoutines.map((routine) => (
                    <li key={routine.id}>
                        <strong>{routine.zookeeper}:</strong> {routine.task_type} for {routine.animal} at {routine.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CareRoutinePage;
