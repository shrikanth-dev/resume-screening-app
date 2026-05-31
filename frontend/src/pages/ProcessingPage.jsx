import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "../styles/processing.css";

function ProcessingPage() {
  const navigate = useNavigate();

  const steps = [
    "Extracting text from resumes",
    "Identifying skills & experience",
    "Comparing with job description",
    "Calculating match scores",
    "Generating results"
  ];

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval =setInterval(() => {
      setProgress((prev) => {
        const next = prev + 20;

        if (next <= 100) {
          setCurrentStep(Math.min(Math.floor(next / 20), 4));
          return next;
        }

        clearInterval(interval);

        setTimeout(() => {
          navigate("/results");
        }, 500);

        return 100;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="processing-page">
      <div className="processing-header">
        <h1>Analyzing Resumes</h1>
        <p>
          Please wait while we analyze the resumes and match them with the job description.
        </p>
      </div>

      <div className="processing-content">
        <div className="progress-section">
          <div className="progress-circle">
            <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              pathColor: "#2563eb",
              textColor: "#0f172a",
              trailColor: "#e2e8f0"
            })}
            />
          </div>

          <p className="processing-text">
            Processing...
          </p>

          <div className="ai-card">
            <p>
              Our Ai analyze skills, experience, education and keywords to generate accurate match scores.
            </p>
          </div>
        </div>

        <div className="steps-section">
          {steps.map((step, index) => (
            <div
            key={index}
            className={`step-card ${
              index < currentStep ? "completed" : index === currentStep ? "active" : ""
            }`}
            >
              <span className="status-dot"></span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default ProcessingPage;


