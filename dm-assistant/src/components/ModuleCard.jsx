import React from "react";

const ModuleCard = ({ title, description, completed, onComplete }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "16px",
      backgroundColor: completed ? "#e0ffe0" : "#fff"
    }}>
      <h3>{title}</h3>
      <p>{description}</p>
      {completed ? (
        <p style={{ color: "green", fontWeight: "bold" }}>✅ Completed</p>
      ) : (
        <button onClick={onComplete}>Complete Module</button>
      )}
    </div>
  );
};

export default ModuleCard;
