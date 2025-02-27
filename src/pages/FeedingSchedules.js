import React, { useState, useEffect } from "react";
import { fetchFeedingSchedules, addFeedingSchedule } from "../api";  // ✅ Corrected Import
import FeedingForm from "../components/FeedingForm";

const FeedingSchedules = () => {
    const [feedings, setFeedings] = useState([]);

    useEffect(() => {
        fetchFeedingSchedules().then((response) => {
            setFeedings(response.data);
        });
    }, []);

    const handleAddFeeding = (feeding) => {
        addFeedingSchedule(feeding).then((response) => {
            setFeedings([...feedings, response.data]);
        });
    };

    return (
        <div>
            <h2>Feeding Schedules</h2>
            <FeedingForm onAddFeeding={handleAddFeeding} />
            <ul>
                {feedings.map((feeding) => (
                    <li key={feeding.id}>
                        {feeding.animal.name} - {feeding.time} - {feeding.food}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedingSchedules;
