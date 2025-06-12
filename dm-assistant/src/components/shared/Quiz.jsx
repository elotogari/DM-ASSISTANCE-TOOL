import React, { useState } from "react";
import quizStyles from "./quizStyles";

const Quiz = ({ questions, onComplete, onCancel, xpReward }) => {
  // Current question index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Index of selected answer option
  const [selected, setSelected] = useState(null);
  // Whether to show feedback after answering
  const [showFeedback, setShowFeedback] = useState(false);
  // Number of correct answers so far
  const [score, setScore] = useState(0);
  // Whether quiz is finished
  const [finished, setFinished] = useState(false);

  // Current question object
  const current = questions[currentIndex];

  // Handle user selecting an answer
  const handleAnswer = (isCorrect, index) => {
    if (selected !== null) return;  // prevent changing answer once selected
    setSelected(index);             // save selected option index
    setShowFeedback(true);          // show feedback for the answer
    if (isCorrect) setScore((prev) => prev + 1);  // increment score if correct
  };

  // Go to next question or finish quiz
  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);            // all questions answered
    }
  };

  // Restart quiz from the beginning
  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setFinished(false);
  };

  // Finish quiz: award XP if perfect score, else cancel
  const handleFinish = () => {
    if (score === questions.length) {
      onComplete(xpReward);
    } else {
      onCancel();
    }
  };

  // If quiz finished, show score and options to retry or return
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

  // Quiz in progress: show current question and answer options
  return (
    <div style={quizStyles.container}>
      <h3>{current.question}</h3>

      {/* Render answer options */}
      {current.options.map((opt, i) => {
        let style = { ...quizStyles.button, border: "1px solid #ddd", cursor: "pointer" };

        if (selected !== null) {
          // Highlight selected option
          if (i === selected) {
            style.border = "2px solid #6b46c1";
            style.backgroundColor = opt.correct ? "#a3d8a1" : "#e09a9a"; // green if correct, red if incorrect
            style.cursor = "default";
          }
          // Highlight correct answer if different from selected
          if (opt.correct && i !== selected) {
            style.backgroundColor = "#a3d8a1";
          }
        }

        return (
          <button
            key={i}
            onClick={() => handleAnswer(opt.correct, i)}
            disabled={selected !== null} // disable once an answer is selected
            style={style}
          >
            {opt.text}
          </button>
        );
      })}

      {/* Show next/finish button after answering */}
      {showFeedback && (
        <button
          onClick={handleNext}
          style={{ ...quizStyles.button, ...quizStyles.primaryButton, marginTop: 10 }}
        >
          {currentIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
        </button>
      )}

      {/* Cancel button to go back to dashboard */}
      <button
        onClick={onCancel}
        style={{ ...quizStyles.button, ...quizStyles.secondaryButton, marginTop: 10 }}
        disabled={showFeedback} // disable cancel while feedback is shown
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Quiz;
