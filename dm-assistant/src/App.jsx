import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import XPTracker from "./components/XPTracker";
import ModuleCard from "./components/ModuleCard";
import Quiz from "./components/shared/Quiz";
import decisionQuestions from "./data/decisionQuestions";
import rulesQuestions from "./data/rulesQuestions";

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

  if (activeModule === "rules" || activeModule === "decision-making") {
    const moduleData = modules.find((m) => m.key === activeModule);
    const questions = activeModule === "rules" ? rulesQuestions : decisionQuestions;

    return (
      <div style={{ padding: "20px", backgroundColor: "#f9fafb", color: "#333", borderRadius: "8px" }}>
        <h2>{moduleData.title}</h2>
        <Quiz
          questions={questions}
          xpReward={moduleData.xp}
          onComplete={(xpGained) => handleCompleteModule(activeModule, xpGained)}
          onCancel={() => setActiveModule(null)}
        />
      </div>
    );
  }

  if (activeModule) {
    const moduleData = modules.find((m) => m.key === activeModule);

    return (
      <div style={{ padding: "20px" }}>
        <h2>{moduleData.title}</h2>
        <p>This module is under construction.</p>
        <button onClick={() => handleCompleteModule(activeModule, moduleData.xp)}>
          Mark as Complete
        </button>
        <button onClick={() => setActiveModule(null)} style={{ marginLeft: 10 }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

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
              color: "black",
              padding: "6px 0",
              textAlign: "center",
              transition: "width 0.4s ease",
              fontWeight: "bold",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>
              {progress}% Complete
            </span>
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
