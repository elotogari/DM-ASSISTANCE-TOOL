import React from "react";

// Functional component to display a training module card
// Props:
// - title: string, the module title
// - description: string, brief description of the module
// - completed: boolean, whether the module has been completed
// - onStart: function, callback when the "Start Module" button is clicked
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
        opacity: completed ? 0.6 : 1,   // Dim the card if completed
      }}
    >
      {/* Module title */}
      <h3 style={{ margin: "0 0 8px", fontSize: "18px", color: "#333" }}>{title}</h3>

      {/* Module description */}
      <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#555" }}>{description}</p>

      {/* Conditional rendering of button based on completion status */}
      {completed ? (
        // Disabled button when module is completed
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
        // Active button to start the module
        <button
          style={{
            backgroundColor: "#6b46c1",   
            color: "#fff",                
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={onStart}               // Trigger onStart callback when clicked
        >
          Start Module
        </button>
      )}
    </div>
  );
};

export default ModuleCard;
