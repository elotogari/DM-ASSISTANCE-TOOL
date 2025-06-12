import React from "react";

const Home = ({ onStart }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to DM Assistant</h1>
      <p>Learn how to become a confident Dungeon Master through gamified learning!</p>
      <button onClick={onStart} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Start
      </button>
    </div>
  );
};

export default Home;