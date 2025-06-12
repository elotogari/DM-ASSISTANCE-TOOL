import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import XPTracker from "./components/XPTracker";
import ModuleCard from "./components/ModuleCard";
import Quiz from "./components/shared/Quiz";
import decisionQuestions from "./data/decisionQuestions";
import rulesQuestions from "./data/rulesQuestions";
import ScenarioWalkthrough from "./components/ScenarioWalkthrough";
import StorytellingQuest from "./components/StorytellingQuest";

function App() {
  // State to track if user has started the app
  const [started, setStarted] = useState(false);

  // State to track user's XP points
  const [xp, setXp] = useState(0);

  // State to track which modules have been completed
  const [completedModules, setCompletedModules] = useState({});

  // State to track which module is currently active/open
  const [activeModule, setActiveModule] = useState(null);

  // List of available modules with their keys, titles, descriptions, and XP rewards
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
    {
      key: "scenario",
      title: "Scenario Walkthrough",
      description: "Navigate a story-driven scenario with meaningful choices.",
      xp: 70,
    },
  ];

  // On component mount, load saved XP and completed modules from localStorage
  useEffect(() => {
    const savedXp = parseInt(localStorage.getItem("xp"), 10) || 0;
    const savedModules = JSON.parse(localStorage.getItem("completedModules")) || {};
    setXp(savedXp);
    setCompletedModules(savedModules);
  }, []);

  // Save XP and completed modules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("completedModules", JSON.stringify(completedModules));
  }, [xp, completedModules]);

  // Function to handle completing a module:
  // - Marks the module completed if not already done
  // - Adds XP reward to total XP
  // - Closes the active module view
  const handleCompleteModule = (key, xpGained) => {
    if (!completedModules[key]) {
      setCompletedModules((prev) => ({ ...prev, [key]: true }));
      setXp((prev) => prev + xpGained);
    }
    setActiveModule(null);
  };

  // Calculate the user's progress as a percentage of modules completed
  const progress = Math.round(
    (Object.keys(completedModules).filter((key) => completedModules[key]).length / modules.length) * 100
  );

  // Basic container styling used throughout the app
  const containerStyle = {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  };

  // If app hasn't started yet, show the Home component with a start button
  if (!started) {
    return (
      <div style={containerStyle}>
        <Home onStart={() => setStarted(true)} />
      </div>
    );
  }

  // Show StorytellingQuest module if active
  if (activeModule === "storytelling") {
    const moduleData = modules.find((m) => m.key === "storytelling");

    return (
      <div style={containerStyle}>
        <h2>{moduleData.title}</h2>
        <StorytellingQuest
          xpReward={moduleData.xp}
          onComplete={(xpGained) => handleCompleteModule("storytelling", xpGained)}
          onCancel={() => setActiveModule(null)}
        />
      </div>
    );
  }

  // Show Quiz component for rules or decision-making modules
  if (activeModule === "rules" || activeModule === "decision-making") {
    const moduleData = modules.find((m) => m.key === activeModule);
    const questions = activeModule === "rules" ? rulesQuestions : decisionQuestions;

    return (
      <div style={{ ...containerStyle, backgroundColor: "#f9fafb", color: "#333", borderRadius: "8px" }}>
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

  // Show ScenarioWalkthrough module if active
  if (activeModule === "scenario") {
    const moduleData = modules.find((m) => m.key === "scenario");

    return (
      <div style={containerStyle}>
        <h2>{moduleData.title}</h2>
        <ScenarioWalkthrough
          xpReward={moduleData.xp}
          onComplete={(xpGained) => handleCompleteModule("scenario", xpGained)}
          onCancel={() => setActiveModule(null)}
        />
      </div>
    );
  }

  // For any other active module (not yet implemented), show a placeholder message
  if (activeModule) {
    const moduleData = modules.find((m) => m.key === activeModule);

    return (
      <div style={containerStyle}>
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

  // Default view: show the dashboard with XP, progress bar, and module cards
  return (
    <div style={containerStyle}>
      <h2>Module Dashboard</h2>

      {/* Display current XP */}
      <XPTracker xp={xp} />

      {/* Progress bar showing completion percentage */}
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
            <span style={{ whiteSpace: "nowrap" }}>{progress}% Complete</span>
          </div>
        </div>
      </div>

      {/* List of modules with ModuleCard components */}
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
