import React, { useState } from "react";

const quests = [
  { id: 1, title: "Create a villain", xp: 10 },
  { id: 2, title: "Design a setting", xp: 15 },
  { id: 3, title: "Write a conflict", xp: 25 },
];

export default function StorytellingQuest({ onComplete }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  const currentTask = quests[currentTaskIndex];

  const handleCompleteTask = () => {
    setTotalXp((prev) => prev + currentTask.xp);

    if (currentTaskIndex + 1 < quests.length) {
      // Move to next task
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      // All tasks done, complete module
      onComplete(totalXp + currentTask.xp);
    }
  };

  return (
    <div>
      <h3>Task {currentTaskIndex + 1} of {quests.length}</h3>
      <p>{currentTask.title}</p>
      <button onClick={handleCompleteTask}>Complete Task (+{currentTask.xp} XP)</button>
    </div>
  );
}
