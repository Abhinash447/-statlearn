import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SkillSelection.css";

const subjects = [
  { name: "Java", icon: "☕" },
  { name: "Python", icon: "🐍" },
  { name: "C", icon: "C" },
  { name: "C++", icon: "C+" },
  { name: "JavaScript", icon: "JS" },
  { name: "SQL", icon: "DB" },
];

const levels = [
  {
    name: "Beginner",
    description: "Basic concepts and fundamentals",
  },
  {
    name: "Intermediate",
    description: "Practical knowledge and problem solving",
  },
  {
    name: "Advanced",
    description: "Complex concepts and advanced applications",
  },
];

function SkillSelection() {
  const navigate = useNavigate();

  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const startAssessment = () => {
    if (!selectedSkill || !selectedLevel) {
      return;
    }

    navigate("/skill-assessment", {
      state: {
        skill: selectedSkill,
        level: selectedLevel,
      },
    });
  };

  return (
    <div className="selection-page">
      <div className="selection-container">

        {/* BACK TO DASHBOARD */}

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/student-dashboard")}
        >
          ← Dashboard
        </button>

        {/* HEADER */}

        <div className="selection-header">
          <p className="eyebrow">
            SKILL ASSESSMENT
          </p>

          <h1>
            Choose Your Skill
          </h1>

          <p>
            Select a subject and your current level.
            Your assessment will contain questions
            specifically designed for your selection.
          </p>
        </div>

        {/* SUBJECT */}

        <h3>
          Select Subject
        </h3>

        <div className="subject-grid">
          {subjects.map((subject) => (
            <button
              type="button"
              key={subject.name}
              className={`subject-card ${
                selectedSkill === subject.name
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedSkill(subject.name)
              }
            >
              <span className="subject-icon">
                {subject.icon}
              </span>

              <span className="subject-name">
                {subject.name}
              </span>

              <span className="subject-check">
                {selectedSkill === subject.name
                  ? "✓"
                  : ""}
              </span>
            </button>
          ))}
        </div>

        {/* LEVEL */}

        <h3>
          Select Your Level
        </h3>

        <div className="level-grid">
          {levels.map((level) => (
            <button
              type="button"
              key={level.name}
              className={`level-card ${
                selectedLevel === level.name
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedLevel(level.name)
              }
            >
              <strong>
                {level.name}
              </strong>

              <span>
                {level.description}
              </span>
            </button>
          ))}
        </div>

        {/* START */}

        <button
          type="button"
          className="start-assessment-btn"
          onClick={startAssessment}
          disabled={
            !selectedSkill ||
            !selectedLevel
          }
        >
          Start{" "}
          {selectedSkill || "Skill"}{" "}
          Assessment →
        </button>

      </div>
    </div>
  );
}

export default SkillSelection;