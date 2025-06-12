import React, { useState } from "react";
import Home from "./components/Home";
import XPTracker from "./components/XPTracker";

function App() {
  const [started, setStarted] = useState(false);
  const [xp, setXp] = useState(0);

  return (
    <div>
      {!started ? (
        <Home onStart={() => setStarted(true)} />
      ) : (
        <div style={{ padding: "20px" }}>
          <h2>Module Dashboard</h2>
          <XPTracker xp={xp} />
          {/* Add your learning modules here later */}
        </div>
      )}
    </div>
  );
}

export default App;
