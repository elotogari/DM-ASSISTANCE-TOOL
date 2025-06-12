import React from "react";

const ModuleCard = ({ title, description, completed, onStart }) => {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        opacity: completed ? 0.6 : 1,
      }}
    >
      <h3 style={{ margin: "0 0 8px", fontSize: "18px", color: "#333" }}>{title}</h3>
      <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#555" }}>{description}</p>
      {completed ? (
        <button
          style={{
            backgroundColor: "#ccc",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            color: "#666",
            cursor: "not-allowed",
          }}
          disabled
        >
          Completed
        </button>
      ) : (
        <button
          style={{
            backgroundColor: "#6b46c1",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={onStart}
        >
          Start Module
        </button>
      )}
    </div>
  );
};

export default ModuleCard;
