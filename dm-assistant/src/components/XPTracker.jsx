import React from "react";

const XPTracker = ({ xp }) => {
  const level = Math.floor(xp / 100);
  const currentXP = xp % 100;
  const progressPercent = (currentXP / 100) * 100;

  const containerStyle = {
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const progressBarBackground = {
    height: "20px",
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "5px",
  };

  const progressBarFill = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: "#6b46c1",
    transition: "width 0.3s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      <div>
        <strong>Level:</strong> {level} &nbsp;|&nbsp; <strong>XP:</strong> {currentXP} / 100
      </div>
      <div style={progressBarBackground}>
        <div style={progressBarFill} />
      </div>
    </div>
  );
};

export default XPTracker;
