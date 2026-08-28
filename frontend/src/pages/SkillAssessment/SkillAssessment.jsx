import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import questionBank from "../../data/questionBank";

import "./SkillAssessment.css";

const API_URL = "http://localhost:5000/api/v1";

function SkillAssessment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { skill, level } = location.state || {};

  // ==========================================
  // GET QUESTIONS
  // ==========================================

  const questions = useMemo(() => {
    if (!skill || !level) {
      return [];
    }

    return questionBank?.[skill]?.[level] || [];
  }, [skill, level]);

  // ==========================================
  // STATE
  // ==========================================

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [answers, setAnswers] = useState([]);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // VALIDATE ASSESSMENT
  // ==========================================

  useEffect(() => {
    if (
      !skill ||
      !level ||
      questions.length === 0
    ) {
      navigate("/skill-selection", {
        replace: true,
      });
    }
  }, [
    skill,
    level,
    questions.length,
    navigate,
  ]);

  if (
    !skill ||
    !level ||
    questions.length === 0
  ) {
    return null;
  }

  // ==========================================
  // CURRENT QUESTION
  // ==========================================

  const question =
    questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  // ==========================================
  // NEXT / SUBMIT
  // ==========================================

  const handleNext = async () => {
    if (!selectedAnswer || submitting) {
      return;
    }

    setError("");

    // Save current answer
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] =
      selectedAnswer;

    setAnswers(updatedAnswers);

    // ========================================
    // NEXT QUESTION
    // ========================================

    if (
      currentQuestion <
      questions.length - 1
    ) {
      const nextIndex =
        currentQuestion + 1;

      setCurrentQuestion(nextIndex);

      setSelectedAnswer(
        updatedAnswers[nextIndex] || ""
      );

      return;
    }

    // ========================================
    // CALCULATE SCORE
    // ========================================

    const score =
      updatedAnswers.reduce(
        (total, answer, index) => {
          return (
            total +
            (answer ===
            questions[index]?.answer
              ? 1
              : 0)
          );
        },
        0
      );

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    // ========================================
    // SAVE TO BACKEND
    // ========================================

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/assessments`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            skill,
            level,
            type: "initial",
            score,
            totalQuestions:
              questions.length,
            percentage,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "Assessment save response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save assessment."
        );
      }

      // ========================================
      // GO TO RESULT
      // ========================================

      if (!data.assessment?._id) {
        throw new Error(
          "Assessment ID was not returned by the server."
        );
      }

      navigate(
        `/assessment-result/${data.assessment._id}`,
        {
          replace: true,
        }
      );

    } catch (error) {
      console.error(
        "Assessment submission error:",
        error
      );

      setError(
        error.message ||
          "Unable to save assessment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // PREVIOUS
  // ==========================================

  const handlePrevious = () => {
    if (currentQuestion === 0) {
      return;
    }

    const previousIndex =
      currentQuestion - 1;

    setCurrentQuestion(previousIndex);

    setSelectedAnswer(
      answers[previousIndex] || ""
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="assessment-page">

      <div className="assessment-container">

        {/* ==================================
            TOP
        ================================== */}

        <div className="assessment-top">

          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate("/skill-selection")
            }
          >
            ← Back
          </button>

          <div className="assessment-title">

            <h2>
              {skill} Assessment
            </h2>

            <p>
              {level} Level •{" "}
              {questions.length} Questions
            </p>

          </div>

          <span className="question-count">
            {currentQuestion + 1} /{" "}
            {questions.length}
          </span>

        </div>

        {/* ==================================
            PROGRESS
        ================================== */}

        <div className="progress">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        {/* ==================================
            ERROR
        ================================== */}

        {error && (
          <div className="assessment-error">
            {error}
          </div>
        )}

        {/* ==================================
            QUESTION
        ================================== */}

        <div className="question-card">

          <p className="question-number">
            Question {currentQuestion + 1}
          </p>

          <h3>
            {question.question}
          </h3>

          {/* OPTIONS */}

          <div className="options">

            {question.options.map(
              (option) => (

                <button
                  type="button"
                  key={option}
                  className={`option ${
                    selectedAnswer === option
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedAnswer(option)
                  }
                  disabled={submitting}
                >

                  <span className="option-circle">
                    {selectedAnswer === option
                      ? "✓"
                      : ""}
                  </span>

                  <span>
                    {option}
                  </span>

                </button>

              )
            )}

          </div>

          {/* ACTIONS */}

          <div className="assessment-actions">

            <button
              type="button"
              className="previous-btn"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0 ||
                submitting
              }
            >
              ← Previous
            </button>

            <button
              type="button"
              className="next-btn"
              onClick={handleNext}
              disabled={
                !selectedAnswer ||
                submitting
              }
            >
              {submitting
                ? "Saving..."
                : currentQuestion ===
                  questions.length - 1
                ? "Submit Assessment"
                : "Next Question →"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SkillAssessment;