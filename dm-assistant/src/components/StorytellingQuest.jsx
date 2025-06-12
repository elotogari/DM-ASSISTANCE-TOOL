import React, { useState } from "react";

const CreateVillainTask = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [motivation, setMotivation] = useState("");
  const [traits, setTraits] = useState([]);

  const possibleTraits = ["Cunning", "Greedy", "Vengeful", "Charismatic"];

  const toggleTrait = (trait) => {
    setTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

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
      <input
        placeholder="Villain Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        placeholder="Motivation"
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <div>
        <p>Select personality traits:</p>
        {possibleTraits.map((trait) => (
          <label key={trait} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={traits.includes(trait)}
              onChange={() => toggleTrait(trait)}
            />
            {trait}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: "15px" }}>
        Complete Task
      </button>
    </div>
  );
};

const DesignSettingTask = ({ onComplete }) => {
  const [setting, setSetting] = useState("");

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
      <textarea
        placeholder="Describe your setting here..."
        value={setting}
        onChange={(e) => setSetting(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleSubmit}>Complete Task</button>
    </div>
  );
};

const WriteConflictTask = ({ onComplete }) => {
  const [conflict, setConflict] = useState("");

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
      <textarea
        placeholder="Describe the conflict..."
        value={conflict}
        onChange={(e) => setConflict(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleSubmit}>Complete Task</button>
    </div>
  );
};

const StorytellingQuest = ({ onComplete, onCancel, xpReward }) => {
  const tasks = [
    { key: "villain", title: "Create a Villain", component: CreateVillainTask },
    { key: "setting", title: "Design a Setting", component: DesignSettingTask },
    { key: "conflict", title: "Write a Conflict", component: WriteConflictTask },
  ];

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskData, setTaskData] = useState({});

  const CurrentTaskComponent = tasks[currentTaskIndex].component;

  const handleTaskComplete = (data) => {
    setTaskData((prev) => ({ ...prev, [tasks[currentTaskIndex].key]: data }));

    if (currentTaskIndex + 1 < tasks.length) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      // All tasks done, call onComplete with xpReward
      onComplete(xpReward);
    }
  };

  return (
    <div>
      <h3>{tasks[currentTaskIndex].title}</h3>
      <CurrentTaskComponent onComplete={handleTaskComplete} />
      <button
        onClick={onCancel}
        style={{ marginTop: "20px", backgroundColor: "#eee", borderRadius: "8px", padding: "8px 12px" }}
      >
        Cancel and Return to Dashboard
      </button>
    </div>
  );
};

export default StorytellingQuest;
