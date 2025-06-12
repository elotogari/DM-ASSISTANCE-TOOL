import React, { useState } from "react";

// Styles for the main container
const containerStyle = {
  backgroundColor: "#f9fafb",
  color: "#333",
  borderRadius: "8px",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

// Base button styles
const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

// Primary button (purple)
const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#6b46c1",
  color: "white",
  marginTop: "15px",
};

// Secondary button (light gray)
const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#eee",
  color: "#333",
  marginLeft: "10px",
  marginTop: "15px",
};

// Predefined scenarios array containing steps and choices
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
          nextStep: null, // null indicates end of this scenario branch
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

// Main component for walkthrough of scenarios
const ScenarioWalkthrough = ({ onComplete, onCancel, xpReward = 50 }) => {
  // Track which scenario is active (index in scenarios array)
  const [scenarioIndex, setScenarioIndex] = useState(0);
  // Track current step index within the current scenario
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Track which choice the user has selected for the current step
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  // Whether to show feedback for selected choice
  const [showFeedback, setShowFeedback] = useState(false);
  // Whether the current scenario is completed
  const [scenarioComplete, setScenarioComplete] = useState(false);

  // Current scenario and step objects for easy access
  const currentScenario = scenarios[scenarioIndex];
  const currentStep = currentScenario[currentStepIndex];

  // User selects a choice: update selectedChoiceIndex state
  const handleChoiceSelect = (index) => {
    setSelectedChoiceIndex(index);
  };

  // When user submits their choice
  const handleNext = () => {
    if (selectedChoiceIndex === null) {
      // Ensure user selects a choice before continuing
      alert("Please select a choice before continuing.");
      return;
    }
    // Show feedback related to selected choice
    setShowFeedback(true);
  };

  // When user clicks to continue after feedback
  const handleContinue = () => {
    const choice = currentStep.choices[selectedChoiceIndex];
    if (choice.nextStep === null) {
      // End of this scenario branch, mark scenario as complete
      setScenarioComplete(true);
      setShowFeedback(false);
    } else {
      // Move to the next step indicated by nextStep id
      const nextStepIdx = currentScenario.findIndex((s) => s.id === choice.nextStep);
      setCurrentStepIndex(nextStepIdx);
      // Reset selected choice and hide feedback
      setSelectedChoiceIndex(null);
      setShowFeedback(false);
    }
  };

  // Proceed to next scenario or finish all
  const handleNextScenario = () => {
    if (scenarioIndex + 1 < scenarios.length) {
      // More scenarios available: reset step and states for next scenario
      setScenarioIndex(scenarioIndex + 1);
      setCurrentStepIndex(0);
      setSelectedChoiceIndex(null);
      setShowFeedback(false);
      setScenarioComplete(false);
    } else {
      // All scenarios completed: call onComplete with total XP
      onComplete(xpReward * scenarios.length);
    }
  };

  // Restart current scenario from the beginning
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
          {/* Display current step text */}
          <p style={{ whiteSpace: "pre-line" }}>{currentStep.text}</p>

          {!showFeedback && (
            <div>
              {/* List of choice options for the current step */}
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
                          ? "2px solid #6b46c1" // highlight selected choice
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
              {/* Button to submit selected choice */}
              <button onClick={handleNext} style={primaryButtonStyle}>
                Submit Choice
              </button>
              {/* Button to cancel and return to dashboard */}
              <button onClick={onCancel} style={secondaryButtonStyle}>
                Cancel and Return to Dashboard
              </button>
            </div>
          )}

          {/* Show feedback after submitting a choice */}
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

              {/* Continue to next step or scenario branch */}
              <button onClick={handleContinue} style={primaryButtonStyle}>
                Continue
              </button>
              {/* Restart current scenario */}
              <button onClick={handleReset} style={secondaryButtonStyle}>
                Restart Scenario
              </button>
              {/* Cancel and return to dashboard */}
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
        // Scenario complete screen
        <div>
          <p>Scenario complete!</p>
          {scenarioIndex + 1 < scenarios.length ? (
            // Button to go to next scenario if available
            <button onClick={handleNextScenario} style={primaryButtonStyle}>
              Next Scenario
            </button>
          ) : (
            // Finish all scenarios and grant total XP
            <button
              onClick={() => onComplete(xpReward * scenarios.length)}
              style={primaryButtonStyle}
            >
              Finish All Scenarios
            </button>
          )}
          {/* Restart scenario button */}
          <button onClick={handleReset} style={secondaryButtonStyle}>
            Restart Scenario
          </button>
          {/* Cancel and return to dashboard */}
          <button
            onClick={onCancel}
            style={{ ...secondaryButtonStyle, marginLeft: 0 }}
          >
            Cancel and Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ScenarioWalkthrough;
