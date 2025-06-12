import React, { useState } from "react";
import quizStyles from "./quizStyles";

const Quiz = ({ questions, onComplete, onCancel, xpReward }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];

  const handleAnswer = (isCorrect, index) => {
    if (selected !== null) return;
    setSelected(index);
    setShowFeedback(true);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setFinished(false);
  };

  const handleFinish = () => {
    if (score === questions.length) {
      onComplete(xpReward);
    } else {
      onCancel();
    }
  };

  if (finished) {
    const passed = score === questions.length;

    return (
      <div style={quizStyles.container}>
        <h3 style={quizStyles.scoreText}>Quiz complete! Your score: {score} / {questions.length}</h3>
        <p style={quizStyles.feedbackText}>
          {passed ? `Perfect! Great job! You earned ${xpReward} XP.` : "You missed some questions. Try again or go back to the dashboard."}
        </p>
        <button onClick={passed ? handleFinish : handleRetry} style={{ ...quizStyles.button, ...quizStyles.primaryButton }}>
          {passed ? "Return to Dashboard" : "Retry Quiz"}
        </button>
        {!passed && (
          <button onClick={handleFinish} style={{ ...quizStyles.button, ...quizStyles.secondaryButton }}>
            Back to Dashboard
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={quizStyles.container}>
      <h3>{current.question}</h3>
      {current.options.map((opt, i) => {
        let style = { ...quizStyles.button, border: "1px solid #ddd", cursor: "pointer" };

        if (selected !== null) {
          if (i === selected) {
            style.border = "2px solid #6b46c1";
            style.backgroundColor = opt.correct ? "#a3d8a1" : "#e09a9a";
            style.cursor = "default";
          }
          if (opt.correct && i !== selected) {
            style.backgroundColor = "#a3d8a1";
          }
        }

        return (
          <button
            key={i}
            onClick={() => handleAnswer(opt.correct, i)}
            disabled={selected !== null}
            style={style}
          >
            {opt.text}
          </button>
        );
      })}

      {showFeedback && (
        <button
          onClick={handleNext}
          style={{ ...quizStyles.button, ...quizStyles.primaryButton, marginTop: 10 }}
        >
          {currentIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
        </button>
      )}

      <button
        onClick={onCancel}
        style={{ ...quizStyles.button, ...quizStyles.secondaryButton, marginTop: 10 }}
        disabled={showFeedback}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Quiz;
