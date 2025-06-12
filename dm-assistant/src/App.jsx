import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import XPTracker from "./components/XPTracker";
import ModuleCard from "./components/ModuleCard";
import DecisionQuiz from "./components/DecisionQuiz";
import RulesQuiz from "./components/RulesQuiz";  // <- Import RulesQuiz here

function App() {
  const [started, setStarted] = useState(false);
  const [xp, setXp] = useState(0);
  const [completedModules, setCompletedModules] = useState({});
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      key: "storytelling",
      title: "Storytelling Basics",
      description: "Learn how to set the tone and pace of your narrative.",
      xp: 50,
    },
    {
      key: "rules",
      title: "Rules & Mechanics",
      description: "Understand dice rolls, stats, and turn order.",
      xp: 40,
    },
    {
      key: "decision-making",
      title: "Decision Making Quiz",
      description: "Test your quick thinking and conflict resolution skills.",
      xp: 60,
    },
  ];

  useEffect(() => {
    const savedXp = parseInt(localStorage.getItem("xp")) || 0;
    const savedModules = JSON.parse(localStorage.getItem("completedModules")) || {};
    setXp(savedXp);
    setCompletedModules(savedModules);
  }, []);

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("completedModules", JSON.stringify(completedModules));
  }, [xp, completedModules]);

  const handleCompleteModule = (key, xpGained) => {
    if (!completedModules[key]) {
      setCompletedModules((prev) => ({ ...prev, [key]: true }));
      setXp((prev) => prev + xpGained);
    }
    setActiveModule(null);
  };

  const progress = Math.round(
    (Object.keys(completedModules).filter((key) => completedModules[key]).length / modules.length) * 100
  );

  if (!started) {
    return <Home onStart={() => setStarted(true)} />;
  }

  // Show RulesQuiz when "rules" module active
  if (activeModule === "rules") {
    return (
      <div style={{ padding: "20px", backgroundColor: "#f9fafb", color: "#333", borderRadius: "8px" }}>
        <h2>{modules.find((m) => m.key === activeModule).title}</h2>
        <RulesQuiz
          onComplete={(xpGained) => handleCompleteModule(activeModule, xpGained)}
          onCancel={() => setActiveModule(null)}  // Added onCancel here
        />
        <button onClick={() => setActiveModule(null)} style={{ marginTop: 20 }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Show DecisionQuiz when "decision-making" active
  if (activeModule === "decision-making") {
    return (
      <div style={{ padding: "20px", backgroundColor: "#f9fafb", color: "#333", borderRadius: "8px" }}>
        <h2>{modules.find((m) => m.key === activeModule).title}</h2>
        <DecisionQuiz onComplete={() => handleCompleteModule(activeModule, 60)} />
        <button onClick={() => setActiveModule(null)} style={{ marginTop: 20 }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Other modules just mark complete (like storytelling for now)
  if (activeModule) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{modules.find((m) => m.key === activeModule).title}</h2>
        <p>This module is under construction.</p>
        <button
          onClick={() => handleCompleteModule(activeModule, modules.find((m) => m.key === activeModule).xp)}
        >
          Mark as Complete
        </button>
        <button onClick={() => setActiveModule(null)} style={{ marginLeft: 10 }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Default: dashboard with all modules
  return (
    <div style={{ padding: "20px" }}>
      <h2>Module Dashboard</h2>
      <XPTracker xp={xp} />

      <div style={{ margin: "20px 0" }}>
        <div style={{ background: "#eee", borderRadius: "999px", overflow: "hidden" }}>
          <div
            style={{
              width: `${progress}%`,
              background: "#6b46c1",
              color: "white",
              padding: "6px 0",
              textAlign: "center",
              transition: "width 0.4s ease",
            }}
          >
            {progress}% Complete
          </div>
        </div>
      </div>

      {modules.map((mod) => (
        <ModuleCard
          key={mod.key}
          title={mod.title}
          description={mod.description}
          completed={!!completedModules[mod.key]}
          onStart={() => setActiveModule(mod.key)}
        />
      ))}
    </div>
  );
}

export default App;
