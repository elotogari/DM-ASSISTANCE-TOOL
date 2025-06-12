export default [
  {
    question: "What is the standard dice used for most rolls?",
    options: [
      { text: "D6", correct: false },
      { text: "D20", correct: true },
      { text: "D10", correct: false },
      { text: "D4", correct: false },
    ],
  },
  {
    question: "Who takes the first turn in combat?",
    options: [
      { text: "Player with highest initiative", correct: true },
      { text: "DM", correct: false },
      { text: "Player with lowest initiative", correct: false },
      { text: "Random roll", correct: false },
    ],
  },
  {
    question: "What happens if you roll a natural 20?",
    options: [
      { text: "Critical success", correct: true },
      { text: "Automatic fail", correct: false },
      { text: "No effect", correct: false },
      { text: "Lose a turn", correct: false },
    ],
  },
];
