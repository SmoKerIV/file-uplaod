import React, { useEffect, useState } from "react";
import "./Tour.css";
import svg from "../../assets/true1.svg";
import arrow from "../../assets/arrow.svg";
const Tour = () => {
  const [steps, setSteps] = useState([
    { id: 1, label: "Experience contextual conversations", completed: false },
    { id: 2, label: "Brand your customer experience", completed: false },
    { id: 3, label: "Offer support beyond your website", completed: false },
    { id: 4, label: "Top customer support with bots", completed: false },
    { id: 5, label: "Build your team", completed: false },
  ]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  const handleCheckboxChange = (id) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };
  useEffect(() => {
    setButtonDisabled(progress < 100);
  }, [progress]);

  return (
    <div className="contain">
      <div className="container">
        <div className="title1">
          <div className="title">
            <h1>Take a quick tour</h1>
            <img src={arrow} />
          </div>
          <div className="description">
            <p>
              Here are a few steps to help you <br /> hit the ground.
            </p>
          </div>
        </div>
        <div className="progress">
          <div className="percent">{`${Math.round(progress)}%`}</div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="line"></div>
        <div className="step-list">
          {steps.map((step) => (
            <div key={step.id} className="step-item">
              <input
                type="checkbox"
                checked={step.completed}
                onChange={() => handleCheckboxChange(step.id)}
                className="checkbox"
                id={`checkbox-${step.id}`}
              />
              <label
                className="custom-checkbox"
                htmlFor={`checkbox-${step.id}`}
              >
                {step.completed ? (
                  <img src={svg} alt="checkmark" />
                ) : (
                  <div className="circle"></div>
                )}
              </label>
              <label className="step-label">{step.label}</label>
            </div>
          ))}
        </div>
        <button className="skip-button">Skip this</button>
      </div>
      <div className="btn">
        <button disabled={buttonDisabled} className="get-started">
          Get started <span>5</span>
        </button>
      </div>
    </div>
  );
};

export default Tour;
