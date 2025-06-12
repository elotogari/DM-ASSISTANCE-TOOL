import React, { useState } from "react";

const questions = [
  {
    question: "What is the standard dice used for most rolls?",
    options: ["D6", "D20", "D10", "D4"],
    answer: "D20",
  },
  {
    question: "Who takes the first turn in combat?",
    options: [
      "Player with highest initiative",
      "DM",
      "Player with lowest initiative",
      "Random roll",
    ],
    answer: "Player with highest initiative",
  },
  {
    question: "What happens if you roll a natural 20?",
    options: ["Critical success", "Automatic fail", "No effect", "Lose a turn"],
    answer: "Critical success",
  },
];

const RulesQuiz = ({ onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

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
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  const handleFinish = () => {
    if (score === questions.length) {
      onComplete(50); // only give XP if perfect score
    } else {
      onCancel(); // go back without XP
    }
  };

  if (quizFinished) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Quiz complete! Your score: {score} / {questions.length}</h3>
        {score === questions.length ? (
          <>
            <p>Perfect! Great job! You earned 50 XP.</p>
            <button
              onClick={handleFinish}
              style={{
                backgroundColor: "#6b46c1",
                color: "black",
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Return to Dashboard
            </button>
          </>
        ) : (
          <>
            <p>You missed some questions. Try again or go back to the dashboard.</p>
            <button
              onClick={handleRetry}
              style={{
                backgroundColor: "#6b46c1",
                color: "black",
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                marginRight: 10,
              }}
            >
              Retry Quiz
            </button>
            <button
              onClick={handleFinish}
              style={{
                backgroundColor: "#ccc",
                color: "black",
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
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
                color: "black",
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
            color: "black",
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          {currentIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
        </button>
      )}
    </div>
  );
};

export default RulesQuiz;
