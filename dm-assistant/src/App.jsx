import React, { useState } from "react";
import Home from "./components/Home";
import XPTracker from "./components/XPTracker";
import ModuleCard from "./components/ModuleCard";

function App() {
  const [started, setStarted] = useState(false);
  const [xp, setXp] = useState(0);
  const [completedModules, setCompletedModules] = useState({ storytelling: false });

  const handleCompleteModule = (key, xpGained) => {
    setCompletedModules((prev) => ({ ...prev, [key]: true }));
    setXp((prev) => prev + xpGained);
  };

  return (
    <div>
      {!started ? (
        <Home onStart={() => setStarted(true)} />
      ) : (
        <div style={{ padding: "20px" }}>
          <h2>Module Dashboard</h2>
          <XPTracker xp={xp} />

          <ModuleCard
            title="Storytelling Basics"
            description="Learn how to set the tone and pace of your narrative as a Dungeon Master."
            completed={completedModules.storytelling}
            onComplete={() => handleCompleteModule("storytelling", 50)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
