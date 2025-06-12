import React from "react";

const XPTracker = ({ xp }) => {
  // Calculate user level based on XP (100 XP = 1 level)
  const level = Math.floor(xp / 100);

  // Current XP towards next level (remainder of division)
  const currentXP = xp % 100;

  // Progress bar fill percentage (0 to 100)
  const progressPercent = (currentXP / 100) * 100;

  // Container styling for the XP tracker box
  const containerStyle = {
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  // Background style for the progress bar track
  const progressBarBackground = {
    height: "20px",
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "5px",
  };

  // Style for the colored progress bar fill that grows with XP
  const progressBarFill = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: "#6b46c1",
    transition: "width 0.3s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      {/* Display current level and XP progress */}
      <div>
        <strong>Level:</strong> {level} &nbsp;|&nbsp; <strong>XP:</strong> {currentXP} / 100
      </div>

      {/* Progress bar visual */}
      <div style={progressBarBackground}>
        <div style={progressBarFill} />
      </div>
    </div>
  );
};

export default XPTracker;
