import React, { useState } from "react";

// Common styles for container and buttons
const containerStyle = {
  backgroundColor: "#f9fafb",
  color: "#333",
  borderRadius: "8px",
  padding: "20px 30px",
  maxWidth: "600px",
  margin: "0 auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  boxSizing: "border-box",
};

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#6b46c1",
  color: "white",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#eee",
  color: "#333",
  marginLeft: "10px",
};

// Reusable text input component with styling
const TextInput = ({ value, onChange, placeholder, style }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      display: "block",
      marginBottom: "10px",
      maxWidth: "400px",
      width: "100%",
      padding: "8px 12px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      color: "#333",
      boxSizing: "border-box",
      ...style,
    }}
  />
);

// Reusable textarea input component with styling
const TextAreaInput = ({ value, onChange, placeholder, rows = 4, style }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    style={{
      maxWidth: "400px",
      width: "100%",
      marginBottom: "10px",
      padding: "8px 12px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      color: "#333",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      boxSizing: "border-box",
      ...style,
    }}
  />
);

// Styles for trait checkboxes and labels
const traitLabelStyle = {
  display: "inline-flex",
  alignItems: "center",
  marginRight: "15px",
  marginBottom: "8px",
  cursor: "pointer",
  userSelect: "none",
};

const traitCheckboxStyle = {
  marginRight: "6px",
};

// Task component: Create a Villain with name, motivation, and personality traits
const CreateVillainTask = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [motivation, setMotivation] = useState("");
  const [traits, setTraits] = useState([]);

  // List of traits user can select
  const possibleTraits = ["Cunning", "Greedy", "Vengeful", "Charismatic"];

  // Add/remove trait from selection
  const toggleTrait = (trait) => {
    setTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  // Validate input and call onComplete with villain data
  const handleSubmit = () => {
    if (!name.trim() || !motivation.trim()) {
      alert("Please fill in villain name and motivation.");
      return;
    }
    onComplete({ name, motivation, traits });
  };

  return (
    <div>
      <h4>Create your Villain</h4>
      <TextInput
        placeholder="Villain Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        placeholder="Motivation"
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
      />
      <div>
        <p>Select personality traits:</p>
        {possibleTraits.map((trait) => (
          <label key={trait} style={traitLabelStyle}>
            <input
              type="checkbox"
              checked={traits.includes(trait)}
              onChange={() => toggleTrait(trait)}
              style={traitCheckboxStyle}
            />
            {trait}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ ...primaryButtonStyle, marginTop: "15px" }}>
        Complete Task
      </button>
    </div>
  );
};

// Task component: Design a Setting description
const DesignSettingTask = ({ onComplete }) => {
  const [setting, setSetting] = useState("");

  // Validate and submit setting text
  const handleSubmit = () => {
    if (!setting.trim()) {
      alert("Please describe your setting.");
      return;
    }
    onComplete(setting);
  };

  return (
    <div>
      <h4>Design a Setting</h4>
      <TextAreaInput
        placeholder="Describe your setting here..."
        value={setting}
        onChange={(e) => setSetting(e.target.value)}
      />
      <button onClick={handleSubmit} style={primaryButtonStyle}>
        Complete Task
      </button>
    </div>
  );
};

// Task component: Write a Conflict description
const WriteConflictTask = ({ onComplete }) => {
  const [conflict, setConflict] = useState("");

  // Validate and submit conflict text
  const handleSubmit = () => {
    if (!conflict.trim()) {
      alert("Please describe the conflict.");
      return;
    }
    onComplete(conflict);
  };

  return (
    <div>
      <h4>Write a Conflict</h4>
      <TextAreaInput
        placeholder="Describe the conflict..."
        value={conflict}
        onChange={(e) => setConflict(e.target.value)}
      />
      <button onClick={handleSubmit} style={primaryButtonStyle}>
        Complete Task
      </button>
    </div>
  );
};

// Main storytelling quest component that sequences the above tasks
const StorytellingQuest = ({ onComplete, onCancel, xpReward }) => {
  // List of tasks and their components in order
  const tasks = [
    { key: "villain", title: "Create a Villain", component: CreateVillainTask },
    { key: "setting", title: "Design a Setting", component: DesignSettingTask },
    { key: "conflict", title: "Write a Conflict", component: WriteConflictTask },
  ];

  // Track which task is active and collected task data
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskData, setTaskData] = useState({});

  // Get the current task component to render
  const CurrentTaskComponent = tasks[currentTaskIndex]?.component;

  // When a task is completed, save its data and move to next or finish
  const handleTaskComplete = (data) => {
    setTaskData((prev) => ({ ...prev, [tasks[currentTaskIndex].key]: data }));

    if (currentTaskIndex + 1 < tasks.length) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      // All tasks done
      setCurrentTaskIndex(tasks.length);
    }
  };

  // Show summary when all tasks are completed
  if (currentTaskIndex === tasks.length) {
    return (
      <div style={containerStyle}>
        <h3>🎉 Congratulations! You completed all tasks.</h3>
        <p>
          <strong>Total XP earned:</strong> {xpReward}
        </p>

        <h4>Your Story Elements:</h4>

        <div style={{ marginBottom: "15px" }}>
          <h5>Villain</h5>
          <p>
            <strong>Name:</strong> {taskData.villain?.name || "N/A"}
          </p>
          <p>
            <strong>Motivation:</strong> {taskData.villain?.motivation || "N/A"}
          </p>
          <p>
            <strong>Traits:</strong>{" "}
            {taskData.villain?.traits?.length
              ? taskData.villain.traits.join(", ")
              : "None"}
          </p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <h5>Setting</h5>
          <p>{taskData.setting || "N/A"}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <h5>Conflict</h5>
          <p>{taskData.conflict || "N/A"}</p>
        </div>

        <button onClick={() => onComplete(xpReward)} style={primaryButtonStyle}>
          Finish and Return to Dashboard
        </button>

        <button
          onClick={() => {
            // Restart quest by resetting state
            setCurrentTaskIndex(0);
            setTaskData({});
          }}
          style={secondaryButtonStyle}
        >
          Restart Quest
        </button>
      </div>
    );
  }

  // Show current task component with cancel button
  return (
    <div style={containerStyle}>
      <h3>{tasks[currentTaskIndex].title}</h3>
      <CurrentTaskComponent onComplete={handleTaskComplete} />
      <button
        onClick={onCancel}
        style={{ ...secondaryButtonStyle, marginTop: "20px", marginLeft: "0" }}
      >
        Cancel and Return to Dashboard
      </button>
    </div>
  );
};

export default StorytellingQuest;
