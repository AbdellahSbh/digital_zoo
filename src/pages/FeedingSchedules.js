import React, { useState, useEffect } from "react";
import { getFeedingSchedules, addFeedingSchedule } from "../api"; // ✅ Corrected import
import FeedingForm from "../components/FeedingForm";

function FeedingSchedules() {
    const [feedings, setFeedings] = useState([]);

    useEffect(() => {
        fetchFeedingData();
    }, []);

    const fetchFeedingData = () => {
        getFeedingSchedules()
            .then((response) => setFeedings(response.data))
            .catch((error) => console.error("Error fetching feeding schedules:", error));
    };

    const handleAddFeeding = (feeding) => {
        addFeedingSchedule(feeding)
            .then(() => fetchFeedingData()) // ✅ Refresh the list after adding
            .catch((error) => console.error("Error adding feeding:", error));
    };

    return (
        <div>
            <h2>🍽 Feeding Schedules</h2>
            <FeedingForm onAddFeeding={handleAddFeeding} />
            
            <h3>Scheduled Feedings</h3>
            {feedings.length > 0 ? (
                <ul>
                    {feedings.map((feeding) => (
                        <li key={feeding.id}>
                            <strong>{feeding.animal.name}</strong> - {feeding.time} - {feeding.food}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No feeding schedules found.</p>
            )}
        </div>
    );
}

export default FeedingSchedules;
