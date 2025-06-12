import React from "react";

const XPTracker = ({ xp }) => {
  return (
    <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <strong>XP:</strong> {xp}
    </div>
  );
};

export default XPTracker;
