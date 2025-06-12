import React, { useState } from "react";

const containerStyle = {
  backgroundColor: "#f9fafb",
  color: "#333",
  borderRadius: "8px",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#6b46c1",
  color: "white",
  marginTop: "15px",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#eee",
  color: "#333",
  marginLeft: "10px",
  marginTop: "15px",
};

const scenarios = [
  [
    {
      id: 1,
      text: "Scenario 1: You enter a mysterious dungeon. Ahead, you see two paths...",
      choices: [
        {
          text: "Take the lit path",
          feedback: "The lit path is safe.",
          nextStep: 2,
        },
        {
          text: "Take the dark path",
          feedback: "Goblins lurk along the dark path, enter combat.",
          nextStep: 3,
        },
      ],
    },
    {
      id: 2,
      text: "Guards approach. Do you sneak or fight?",
      choices: [
        {
          text: "Sneak",
          feedback: "You slip by unnoticed.",
          nextStep: null,
        },
        {
          text: "Fight",
          feedback: "You overpower the guards.",
          nextStep: null,
        },
      ],
    },
    {
      id: 3,
      text: "You find a locked chest. Pick the lock or leave?",
      choices: [
        {
          text: "Pick the lock",
          feedback: "It was a mimic, enter combat!",
          nextStep: null,
        },
        {
          text: "Leave it",
          feedback: "You avoid the mimic trap.",
          nextStep: null,
        },
      ],
    },
  ],
  [
    {
      id: 1,
      text: "Scenario 2: You find yourself in an enchanted forest. Paths lead left and right...",
      choices: [
        {
          text: "Take the left path",
          feedback: "You meet friendly elves.",
          nextStep: null,
        },
        {
          text: "Take the right path",
          feedback: "You encounter a wild beast, enter combat.",
          nextStep: null,
        },
      ],
    },
  ],
];

const ScenarioWalkthrough = ({ onComplete, onCancel, xpReward = 50 }) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [scenarioComplete, setScenarioComplete] = useState(false);

  const currentScenario = scenarios[scenarioIndex];
  const currentStep = currentScenario[currentStepIndex];

  const handleChoiceSelect = (index) => {
    setSelectedChoiceIndex(index);
  };

  const handleNext = () => {
    if (selectedChoiceIndex === null) {
      alert("Please select a choice before continuing.");
      return;
    }
    setShowFeedback(true);
  };

  const handleContinue = () => {
    const choice = currentStep.choices[selectedChoiceIndex];
    if (choice.nextStep === null) {
      // Scenario finished
      setScenarioComplete(true);
      setShowFeedback(false);
    } else {
      const nextStepIdx = currentScenario.findIndex((s) => s.id === choice.nextStep);
      setCurrentStepIndex(nextStepIdx);
      setSelectedChoiceIndex(null);
      setShowFeedback(false);
    }
  };

  const handleNextScenario = () => {
    if (scenarioIndex + 1 < scenarios.length) {
      setScenarioIndex(scenarioIndex + 1);
      setCurrentStepIndex(0);
      setSelectedChoiceIndex(null);
      setShowFeedback(false);
      setScenarioComplete(false);
    } else {
      onComplete(xpReward * scenarios.length);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedChoiceIndex(null);
    setShowFeedback(false);
    setScenarioComplete(false);
  };

  return (
    <div style={containerStyle}>
      <h3>Scenario Walkthrough</h3>

      {!scenarioComplete ? (
        <>
          <p style={{ whiteSpace: "pre-line" }}>{currentStep.text}</p>

          {!showFeedback && (
            <div>
              {currentStep.choices.map((choice, idx) => (
                <div key={idx} style={{ marginBottom: "8px" }}>
                  <label
                    style={{
                      cursor: "pointer",
                      userSelect: "none",
                      display: "block",
                      padding: "8px",
                      borderRadius: "6px",
                      border:
                        selectedChoiceIndex === idx
                          ? "2px solid #6b46c1"
                          : "1px solid #ccc",
                      backgroundColor:
                        selectedChoiceIndex === idx ? "#ede9fe" : "white",
                    }}
                  >
                    <input
                      type="radio"
                      name="choice"
                      checked={selectedChoiceIndex === idx}
                      onChange={() => handleChoiceSelect(idx)}
                      style={{ marginRight: "8px" }}
                    />
                    {choice.text}
                  </label>
                </div>
              ))}
              <button onClick={handleNext} style={primaryButtonStyle}>
                Submit Choice
              </button>
              <button onClick={onCancel} style={secondaryButtonStyle}>
                Cancel and Return to Dashboard
              </button>
            </div>
          )}

          {showFeedback && (
            <div>
              <p
                style={{
                  backgroundColor: "#e0e7ff",
                  padding: "12px",
                  borderRadius: "6px",
                  marginBottom: "15px",
                  border: "1px solid #a3bffa",
                }}
              >
                {currentStep.choices[selectedChoiceIndex].feedback}
              </p>

              <button onClick={handleContinue} style={primaryButtonStyle}>
                Continue
              </button>
              <button onClick={handleReset} style={secondaryButtonStyle}>
                Restart Scenario
              </button>
              <button
                onClick={onCancel}
                style={{ ...secondaryButtonStyle, marginLeft: 0 }}
              >
                Cancel and Return to Dashboard
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>Scenario complete!</p>
          {scenarioIndex + 1 < scenarios.length ? (
            <button onClick={handleNextScenario} style={primaryButtonStyle}>
              Next Scenario
            </button>
          ) : (
            <button onClick={() => onComplete(xpReward * scenarios.length)} style={primaryButtonStyle}>
              Finish All Scenarios
            </button>
          )}
          <button onClick={handleReset} style={secondaryButtonStyle}>
            Restart Scenario
          </button>
          <button onClick={onCancel} style={{ ...secondaryButtonStyle, marginLeft: 0 }}>
            Cancel and Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ScenarioWalkthrough;
