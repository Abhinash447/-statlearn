import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import questionBank from "../../data/questionBank";
import assessmentBank from "../../data/assessmentBank";

import "./Assessment.css";

const skills = ["Java", "Python", "C", "C++", "JavaScript", "SQL"];
const levels = [
  { name: "Beginner", description: "Fundamentals and basic concepts" },
  {
    name: "Intermediate",
    description: "Practical knowledge and problem solving",
  },
  {
    name: "Advanced",
    description: "Complex concepts and advanced applications",
  },
];
const types = [
  {
    id: "initial",
    icon: "◎",
    title: "Initial Skill Assessment",
    description: "Measure your starting competency and identify skill gaps.",
  },
  {
    id: "postTraining",
    icon: "✓",
    title: "Post-Training Assessment",
    description: "Check whether your competency improved after training.",
  },
  {
    id: "reEvaluation",
    icon: "↻",
    title: "Re-evaluation",
    description: "Recheck weak areas and update your competency score.",
  },
];

export default function Assessment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [skill, setSkill] = useState(location.state?.skill || "");
  const [level, setLevel] = useState(location.state?.level || "");
  const [type, setType] = useState(location.state?.type || "initial");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);

  const questions = useMemo(() => {
    if (!skill || !level) return [];
    return type === "initial"
      ? questionBank[skill]?.[level] || []
      : assessmentBank[skill]?.[level]?.[type] || [];
  }, [skill, level, type]);

  const start = () => {
    if (!skill || !level || !questions.length) return;
    setIndex(0);
    setAnswers([]);
    setSelected("");
    setResult(null);
    setStarted(true);
  };

  const submit = async () => {
    if (!selected) return;

    const updated = [...answers];

    updated[index] = selected;

    setAnswers(updated);

    if (index < questions.length - 1) {
      setIndex((value) => value + 1);

      setSelected(updated[index + 1] || "");

      return;
    }

    const score = updated.reduce(
      (total, answer, i) => total + (answer === questions[i]?.answer ? 1 : 0),
      0,
    );

    const percentage = Math.round((score / questions.length) * 100);

    try {
      const response = await fetch("http://localhost:5000/api/v1/assessments", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          skill,
          level,
          type,
          score,
          totalQuestions: questions.length,
          percentage,
        }),
      });

      const data = await response.json();

      console.log("Assessment API response:", data);

      if (response.status === 401) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      if (!response.ok) {
        alert(data.message || "Failed to save assessment.");

        return;
      }

      const resultData = {
        ...data.assessment,

        total: questions.length,

        competencyScores: {
          [skill]: percentage,
        },
      };

      setResult(resultData);
    } catch (error) {
      console.error("Assessment submission error:", error);

      alert("Unable to connect to the server.");
    }
  };

  const previous = () => {
    if (index === 0) return;
    const previousIndex = index - 1;
    setIndex(previousIndex);
    setSelected(answers[previousIndex] || "");
  };

  const typeTitle =
    types.find((item) => item.id === type)?.title || "Assessment";

  if (!started) {
    return (
      <div className="assessment-page">
        <div className="assessment-selection">
          <button
            className="assessment-back"
            onClick={() => navigate("/student-dashboard")}
          >
            ← Dashboard
          </button>
          <div className="assessment-heading">
            <p className="eyebrow">ASSESSMENTS</p>
            <h1>Evaluate Your Competency</h1>
            <p>
              Select the skill, level and assessment purpose. Your result is
              saved to your account and used for Skill Gaps and Training.
            </p>
          </div>
          <section className="selection-section">
            <h2>1. Select Skill</h2>
            <div className="assessment-skill-grid">
              {skills.map((item) => (
                <button
                  key={item}
                  className={`assessment-choice ${skill === item ? "selected" : ""}`}
                  onClick={() => setSkill(item)}
                >
                  <span>{skill === item ? "✓" : ""}</span>
                  {item}
                </button>
              ))}
            </div>
          </section>
          <section className="selection-section">
            <h2>2. Select Level</h2>
            <div className="assessment-level-grid">
              {levels.map((item) => (
                <button
                  key={item.name}
                  className={`assessment-level ${level === item.name ? "selected" : ""}`}
                  onClick={() => setLevel(item.name)}
                >
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="selection-section">
            <h2>3. Select Assessment Type</h2>
            <div className="assessment-type-grid">
              {types.map((item) => (
                <button
                  key={item.id}
                  className={`assessment-type ${type === item.id ? "selected" : ""}`}
                  onClick={() => setType(item.id)}
                >
                  <div className="type-icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
          {skill && level && (
            <div className="assessment-summary">
              <strong>Selected</strong>
              <span>
                {skill} • {level}
              </span>
              <small>
                {typeTitle} • {questions.length} questions
              </small>
            </div>
          )}
          <button
            className="start-assessment"
            disabled={!skill || !level || !questions.length}
            onClick={start}
          >
            Start Assessment →
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    const strong = result.percentage >= 80;
    const moderate = result.percentage >= 60;
    return (
      <div className="assessment-page">
        <div className="assessment-result">
          <div className="result-icon">✓</div>
          <p className="eyebrow">ASSESSMENT COMPLETE</p>
          <h1>{typeTitle}</h1>
          <p>
            {skill} • {level}
          </p>
          <div className="assessment-score">{result.percentage}%</div>
          <h2>
            {strong
              ? "Strong Competency"
              : moderate
                ? "Good Progress"
                : "Competency Gap Identified"}
          </h2>
          <p className="result-message">
            {strong
              ? "You have demonstrated strong competency in this area."
              : moderate
                ? "You are progressing well. Continue training and practice."
                : "A competency gap was identified. Personalized training is recommended."}
          </p>
          <div className="result-stats">
            <div>
              <strong>{result.score}</strong>
              <span>Correct</span>
            </div>
            <div>
              <strong>{result.total}</strong>
              <span>Questions</span>
            </div>
            <div>
              <strong>{result.percentage}%</strong>
              <span>Score</span>
            </div>
          </div>
          <div className="assessment-result-actions">
            <button onClick={() => navigate("/skill-gaps")}>
              View Skill Gaps →
            </button>
            <button
              className="secondary"
              onClick={() =>
                navigate("/training", {
                  state: { skill, level, percentage: result.percentage },
                })
              }
            >
              View Personalized Training →
            </button>
            <button
              className="secondary"
              onClick={() => navigate("/student-dashboard")}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  return (
    <div className="assessment-page">
      <div className="assessment-container">
        <div className="assessment-top">
          <button className="back-btn" onClick={() => setStarted(false)}>
            ← Back
          </button>
          <div className="assessment-title">
            <p className="eyebrow">{typeTitle}</p>
            <h2>
              {skill} • {level}
            </h2>
          </div>
          <span className="question-count">
            {index + 1}/{questions.length}
          </span>
        </div>
        <div className="assessment-progress">
          <div style={{ width: `${progress}%` }} />
        </div>
        <div className="question-card">
          <div className="question-label">
            {typeTitle} • Question {index + 1}
          </div>
          <h1>{current.question}</h1>
          <div className="assessment-options">
            {current.options.map((option, i) => (
              <button
                key={option}
                className={`answer-option ${selected === option ? "selected" : ""}`}
                onClick={() => setSelected(option)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {selected === option && (
                  <span className="selected-check">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="assessment-actions">
            <button
              className="previous-btn"
              disabled={index === 0}
              onClick={previous}
            >
              ← Previous
            </button>
            <button className="next-btn" disabled={!selected} onClick={submit}>
              {index === questions.length - 1
                ? "Submit Assessment"
                : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
