import React, { useEffect, useState } from "react";
import { getMembershipTiers, addMembership } from "../api";

function ManageMemberships() {
  const [tiers, setTiers] = useState([]);  
  const [membership, setMembership] = useState({ visitor: "", tier: "", end_date: "" });

  useEffect(() => {
    getMembershipTiers()
      .then((data) => {
        console.log("✅ Membership Tiers API Response:", data);
        setTiers(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("❌ Error fetching membership tiers:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMembership(membership)
      .then(() => {
        setMembership({ visitor: "", tier: "", end_date: "" });
      })
      .catch((error) => console.error("❌ Error adding membership:", error));
  };

  return (
    <div>
      <h2>🎟 Manage Memberships</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Visitor Name" value={membership.visitor} onChange={(e) => setMembership({ ...membership, visitor: e.target.value })} required />

        <select value={membership.tier} onChange={(e) => setMembership({ ...membership, tier: e.target.value })} required>
          <option value="">Select Membership Tier</option>
          {tiers.length > 0 ? (
            tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>{tier.name} - {tier.price} USD</option>
            ))
          ) : (
            <option disabled>❌ No membership tiers available</option>
          )}
        </select>

        <input type="date" value={membership.end_date} onChange={(e) => setMembership({ ...membership, end_date: e.target.value })} required />
        <button type="submit">✅ Add Membership</button>
      </form>

      <h3>Existing Membership Tiers</h3>
      {tiers.length > 0 ? (
        <ul>
          {tiers.map((tier) => (
            <li key={tier.id}><strong>{tier.name}</strong> - ${tier.price}</li>
          ))}
        </ul>
      ) : (
        <p>No membership tiers available.</p>
      )}
    </div>
  );
}

export default ManageMemberships;
