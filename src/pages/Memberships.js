import React, { useEffect, useState } from "react";
import { getMemberships } from "../api"; // import API call

function Memberships() {
    const [memberships, setMemberships] = useState([]); // Initialize as an empty array

    useEffect(() => {
        getMemberships()
            .then((data) => {
                console.log("✅ Memberships API Response:", data);
                setMemberships(Array.isArray(data) ? data : []); // Ensure it's an array
            })
            .catch((error) => {
                console.error("❌ Error fetching memberships:", error);
                setMemberships([]); // Set empty array to prevent crashes
            });
    }, []);

    return (
        <div>
            <h2>Memberships</h2>
            {memberships.length > 0 ? (
                <ul>
                    {memberships.map((membership) => (
                        <li key={membership.id}>
                            {membership.visitor} - {membership.tier} - Expires: {membership.end_date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No memberships available.</p> 
            )}
        </div>
    );
}

export default Memberships;