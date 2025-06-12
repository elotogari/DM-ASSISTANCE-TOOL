import React, { useState } from "react";

const questions = [
  {
    question: "You face a conflict between two players. What do you do?",
    options: [
      { text: "Ignore it and hope it resolves", correct: false },
      { text: "Talk to both players calmly", correct: true },
      { text: "Immediately kick them out", correct: false },
    ],
  },
  {
    question: "How do you handle a player breaking the rules?",
    options: [
      { text: "Explain rules again and be fair", correct: true },
      { text: "Punish without discussion", correct: false },
      { text: "Let it slide", correct: false },
    ],
  },
];

const DecisionQuiz = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((s) => s + 1);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
      onComplete(score + (isCorrect ? 1 : 0)); // send final score
    }
  };

  if (finished) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>
          You scored {score} out of {questions.length}
        </p>
        <p>{score === questions.length ? "Excellent work!" : "Try again to improve."}</p>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div>
      <h3>{question.question}</h3>
      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(opt.correct)}
          style={{ display: "block", margin: "10px 0", padding: "8px 12px" }}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
};

export default DecisionQuiz;
