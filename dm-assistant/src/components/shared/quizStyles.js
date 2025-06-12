const quizStyles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "2px solid #ddd",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    margin: "8px 0",
    transition: "all 0.2s ease",
    color: "#333",
    fontSize: "16px",
    backgroundColor: "white",
    userSelect: "none",
    boxSizing: "border-box",
  },
  primaryButton: {
    backgroundColor: "#6b46c1",
    color: "white",
    border: "none",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#eee",
    color: "#333",
    border: "none",
    textAlign: "center",
  },
  correctAnswer: {
    backgroundColor: "#d4edda",
    border: "2px solid #c3e6cb",
    color: "#155724",
  },
  incorrectAnswer: {
    backgroundColor: "#f8d7da",
    border: "2px solid #f5c6cb",
    color: "#721c24",
  },
  feedbackText: {
    margin: "16px 0",
    padding: "0",
    color: "#333",
  },
  scoreText: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#333",
  },
};

export default quizStyles;
