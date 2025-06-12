import React, { useState } from "react";

const questions = [
  {
    question: "What is the standard dice used for most rolls?",
    options: ["D6", "D20", "D10", "D4"],
    answer: "D20",
  },
  {
    question: "Who takes the first turn in combat?",
    options: ["Player with highest initiative", "DM", "Player with lowest initiative", "Random roll"],
    answer: "Player with highest initiative",
  },
  {
    question: "What happens if you roll a natural 20?",
    options: ["Critical success", "Automatic fail", "No effect", "Lose a turn"],
    answer: "Critical success",
  },
];

const RulesQuiz = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option) => {
    if (showFeedback) return; // prevent multiple clicks

    setSelected(option);
    setShowFeedback(true);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(50); // give 50 XP for completing this quiz
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {currentIndex < questions.length ? (
        <>
          <h3>{currentQuestion.question}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {currentQuestion.options.map((option) => (
              <li key={option} style={{ marginBottom: 8 }}>
                <button
                  disabled={showFeedback}
                  onClick={() => handleOptionClick(option)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: selected === option ? "2px solid #6b46c1" : "1px solid #ccc",
                    backgroundColor:
                      showFeedback && option === currentQuestion.answer
                        ? "#a3d8a1"
                        : showFeedback && option === selected && selected !== currentQuestion.answer
                        ? "#e09a9a"
                        : "white",
                    cursor: showFeedback ? "default" : "pointer",
                    width: "100%",
                    textAlign: "left",
                    color: "black",   // <-- changed here
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {showFeedback && (
            <button
              onClick={handleNext}
              style={{
                marginTop: 10,
                backgroundColor: "#6b46c1",
                color: "black",    // <-- changed here (was white)
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              {currentIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
            </button>
          )}
        </>
      ) : (
        <div>
          <h3>
            Quiz complete! Your score: {score} / {questions.length}
          </h3>
          <p>{score === questions.length ? "Perfect! Great job!" : "Keep practicing to master the rules!"}</p>
        </div>
      )}
    </div>
  );
};

export default RulesQuiz;
