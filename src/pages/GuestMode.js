import React, { useEffect, useState } from "react";
import { getAnimals, getHabitats } from "../api";
import "./GuestMode.css";

function GuestMode() {
  const [animals, setAnimals] = useState([]);  // ✅ Default empty array
  const [habitats, setHabitats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAnimals()
      .then((data) => {
        console.log("🐾 Animals API Response:", data);  // ✅ Debugging log
        if (Array.isArray(data)) {
          setAnimals(data);
        } else {
          console.error("❌ API response for animals is not an array:", data);
          setAnimals([]); 
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching animals:", error);
        setError("Failed to load animals.");
      });

    getHabitats()
      .then((data) => {
        console.log("🌿 Habitats API Response:", data);  // ✅ Debugging log
        if (Array.isArray(data)) {
          setHabitats(data);
        } else {
          console.error("❌ API response for habitats is not an array:", data);
          setHabitats([]);
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching habitats:", error);
        setError("Failed to load habitats.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="guest-container">
      <h2>👤 Explore Our Zoo</h2>

      <h3>🌿 Habitats</h3>
      <ul>
        {habitats.length > 0 ? (
          habitats.map((habitat) => (
            <li key={habitat.id}>{habitat.name} - {habitat.description}</li>
          ))
        ) : (
          <p>No habitats available.</p>
        )}
      </ul>

      <h3>🦁 Animals</h3>
      <ul>
        {animals.length > 0 ? (
          animals.map((animal) => (
            <li key={animal.id}>{animal.name} - {animal.species}</li>
          ))
        ) : (
          <p>No animals available.</p>
        )}
      </ul>
    </div>
  );
}

export default GuestMode;
