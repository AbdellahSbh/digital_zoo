// import React, { useEffect, useState } from "react";
// import { getAnimals, getHabitats } from "../api";
// import "./GuestMode.css";

// function GuestMode() {
//   const [animals, setAnimals] = useState([]);  // ✅ Default empty array
//   const [habitats, setHabitats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getAnimals()
//       .then((data) => {
//         console.log("🐾 Animals API Response:", data);  // ✅ Debugging log
//         if (Array.isArray(data)) {
//           setAnimals(data);
//         } else {
//           console.error("❌ API response for animals is not an array:", data);
//           setAnimals([]); 
//         }
//       })
//       .catch((error) => {
//         console.error("❌ Error fetching animals:", error);
//         setError("Failed to load animals.");
//       });

//     getHabitats()
//       .then((data) => {
//         console.log("🌿 Habitats API Response:", data);  // ✅ Debugging log
//         if (Array.isArray(data)) {
//           setHabitats(data);
//         } else {
//           console.error("❌ API response for habitats is not an array:", data);
//           setHabitats([]);
//         }
//       })
//       .catch((error) => {
//         console.error("❌ Error fetching habitats:", error);
//         setError("Failed to load habitats.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="guest-container">
//       <h2>👤 Explore Our Zoo</h2>

//       <h3>🌿 Habitats</h3>
//       <ul>
//         {habitats.length > 0 ? (
//           habitats.map((habitat) => (
//             <li key={habitat.id}>{habitat.name} - {habitat.description}</li>
//           ))
//         ) : (
//           <p>No habitats available.</p>
//         )}
//       </ul>

//       <h3>🦁 Animals</h3>
//       <ul>
//         {animals.length > 0 ? (
//           animals.map((animal) => (
//             <li key={animal.id}>{animal.name} - {animal.species}</li>
//           ))
//         ) : (
//           <p>No animals available.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default GuestMode;

import React, { useEffect, useState } from "react";
import { getAnimals, getHabitats } from "../api";
import "./GuestMode.css";

function GuestMode() {
  const [animals, setAnimals] = useState([]);
  const [habitats, setHabitats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHabitat, setSelectedHabitat] = useState(null);

  useEffect(() => {
    Promise.all([getAnimals(), getHabitats()])
      .then(([animalsData, habitatsData]) => {
        console.log("🐾 Animals API Response:", animalsData);
        console.log("🌿 Habitats API Response:", habitatsData);
        
        if (Array.isArray(habitatsData)) {
          setHabitats(habitatsData);
        } else {
          console.error("❌ API response for habitats is not an array:", habitatsData);
          setHabitats([]);
        }
        
        if (Array.isArray(animalsData)) {
          setAnimals(animalsData);
        } else {
          console.error("❌ API response for animals is not an array:", animalsData);
          setAnimals([]);
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error);
        setError("Failed to load zoo data.");
        setLoading(false);
      });
  }, []);

  // Function to handle habitat button click
  const handleHabitatClick = (habitatId) => {
    setSelectedHabitat(selectedHabitat === habitatId ? null : habitatId);
  };

  // Function to get animals by habitat ID
  const getAnimalsByHabitat = (habitatId) => {
    return animals.filter(animal => animal.habitat === habitatId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="guest-container">
      <h2>👤 Explore Our Zoo</h2>

      <h3>🦁 Animals and Their Habitats</h3>
      {animals.length > 0 ? (
        <div className="animals-container">
          {animals.map((animal) => {
            // Find the habitat object for this animal
            const animalHabitat = habitats.find(h => h.id === animal.habitat);
            
            return (
              <div key={animal.id} className="animal-card">
                <h4>{animal.name}</h4>
                <p><strong>Species:</strong> {animal.species.name}</p>
                <p><strong>Habitat:</strong> {animalHabitat ? animalHabitat.name : "Unknown"}</p>
                <p><strong>Life Span:</strong> {animal.life_span} years</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No animals available.</p>
      )}

      <h3>🌿 Habitats</h3>
      <div className="habitats-list">
        {habitats.length > 0 ? (
          habitats.map((habitat) => (
            <div key={habitat.id} className="habitat-section">
              <button 
                className={`habitat-button ${selectedHabitat === habitat.id ? 'active' : ''}`}
                onClick={() => handleHabitatClick(habitat.id)}
              >
                {habitat.name}
              </button>
              <p className="habitat-description">{habitat.description}</p>
              
              {selectedHabitat === habitat.id && (
                <div className="habitat-animals">
                  <h4>Animals in this habitat:</h4>
                  {getAnimalsByHabitat(habitat.id).length > 0 ? (
                    <ul>
                      {getAnimalsByHabitat(habitat.id).map(animal => (
                        <li key={animal.id}>
                          {animal.name} - {typeof animal.species === 'object' ? animal.species.name : animal.species}
                          {animal.life_span && <span> (Life span: {animal.life_span} years)</span>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No animals in this habitat.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No habitats available.</p>
        )}
      </div>
    </div>
  );
}

export default GuestMode;