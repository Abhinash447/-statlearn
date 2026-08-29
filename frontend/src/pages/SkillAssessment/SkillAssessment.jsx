import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questionBank from "../../data/questionBank";
import "./SkillAssessment.css";

const API_URL = "http://localhost:5000/api/v1";

function shuffleQuestions(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

function SkillAssessment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { skill, level } =
    location.state || {};

  const availableQuestions = useMemo(() => {
    if (!skill || !level) {
      return [];
    }

    return (
      questionBank?.[skill]?.[level] || []
    );
  }, [skill, level]);

  const [questions, setQuestions] =
    useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (
      !skill ||
      !level ||
      !availableQuestions.length
    ) {
      navigate("/skill-selection", {
        replace: true,
      });

      return;
    }

    const shuffled =
      shuffleQuestions(
        availableQuestions
      );

    const selected =
      shuffled.slice(
        0,
        Math.min(10, shuffled.length)
      );

    setQuestions(selected);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setError("");
  }, [
    skill,
    level,
    availableQuestions,
    navigate,
  ]);

  if (
    !skill ||
    !level ||
    !questions.length
  ) {
    return null;
  }

  const question =
    questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  const handleNext = async () => {
    if (
      !selectedAnswer ||
      submitting
    ) {
      return;
    }

    setError("");

    const updatedAnswers = [
      ...answers,
    ];

    updatedAnswers[currentQuestion] =
      selectedAnswer;

    setAnswers(updatedAnswers);

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

    const score =
      updatedAnswers.reduce(
        (total, answer, index) =>
          total +
          (answer ===
          questions[index]?.answer
            ? 1
            : 0),
        0
      );

    const percentage = Math.round(
      (score /
        questions.length) *
        100
    );

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
        "Assessment API response:",
        data
      );

      if (response.status === 401) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save assessment."
        );
      }

      const assessmentId =
        data.assessment?._id;

      if (!assessmentId) {
        throw new Error(
          "Assessment ID was not returned by server."
        );
      }

      navigate(
        `/assessment-result/${assessmentId}`,
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

  const handlePrevious = () => {
    if (currentQuestion === 0) {
      return;
    }

    const previousIndex =
      currentQuestion - 1;

    setCurrentQuestion(
      previousIndex
    );

    setSelectedAnswer(
      answers[previousIndex] || ""
    );
  };

  return (
    <div className="assessment-page">
      <div className="assessment-container">
        <div className="assessment-top">
          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate(
                "/skill-selection"
              )
            }
            disabled={submitting}
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

        <div className="progress">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {error && (
          <div className="assessment-error">
            {error}
          </div>
        )}

        <div className="question-card">
          <p className="question-number">
            Question{" "}
            {currentQuestion + 1}
          </p>

          <h3>
            {question.question}
          </h3>

          <div className="options">
            {question.options.map(
              (option) => (
                <button
                  type="button"
                  key={option}
                  className={`option ${
                    selectedAnswer ===
                    option
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedAnswer(
                      option
                    )
                  }
                  disabled={submitting}
                >
                  <span className="option-circle">
                    {selectedAnswer ===
                    option
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

          <div className="assessment-actions">
            <button
              type="button"
              className="previous-btn"
              onClick={
                handlePrevious
              }
              disabled={
                currentQuestion ===
                  0 ||
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