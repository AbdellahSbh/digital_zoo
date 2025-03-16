import React, { useEffect, useState } from "react";
import { getMembershipTiers } from "../api";  
import "./Memberships.css";

function Memberships() {
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    getMembershipTiers()
      .then((response) => {
        console.log("✅ Membership Tiers:", response.data);  // ✅ Debugging log
        setTiers(response.data);
      })
      .catch((error) => console.error("❌ Error fetching membership tiers:", error));
  }, []);

  return (
    <div className="memberships-container">
      <h2>🎟 Available Zoo Memberships</h2>
      {tiers.length > 0 ? (
        <ul>
          {tiers.map((tier) => (
            <li key={tier.id}>
              <strong>{tier.name}</strong> - ${tier.cost}
              <p>{tier.benefits}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>❌ No memberships found. Try adding one.</p>
      )}
    </div>
  );
}

export default Memberships;
