import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getZookeepers } from "../api";
import "./ZookeeperSelect.css";

function ZookeeperSelect() {
  const navigate = useNavigate();
  const [zookeepers, setZookeepers] = useState([]);

  useEffect(() => {
    getZookeepers()
      .then((data) => setZookeepers(data))
      .catch((error) => console.error("Error fetching zookeepers:", error));
  }, []);

  const handleSelect = (zookeeper) => {
    console.log("Selected Zookeeper:", zookeeper.name);
    navigate("/zookeeper-dashboard");
  };

  return (
    <div className="zookeeper-container">
      <h2>🦺 Select Your Zookeeper Profile</h2>
      <ul>
        {zookeepers.map((zookeeper) => (
          <li key={zookeeper.id}>
            {zookeeper.name} - {zookeeper.specialty}
            <button onClick={() => handleSelect(zookeeper)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ZookeeperSelect;
