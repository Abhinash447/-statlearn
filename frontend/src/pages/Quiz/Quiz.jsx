import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import quizBank from "../../data/quizBank";

import "./Quiz.css";

const skills = [
  "Java",
  "Python",
  "C",
  "C++",
  "JavaScript",
  "SQL",
];

const levels = [
  {
    name: "Beginner",
    description: "Fundamentals and basic concepts",
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

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // INITIAL VALUES
  // ==========================================

  const initialSkill = location.state?.skill || "";
  const initialLevel = location.state?.level || "";

  // ==========================================
  // STATE
  // ==========================================

  const [skill, setSkill] = useState(initialSkill);
  const [level, setLevel] = useState(initialLevel);

  const [started, setStarted] = useState(false);

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState(null);

  // ==========================================
  // LOAD QUESTIONS FROM QUIZ BANK
  // ==========================================

  const questions = useMemo(() => {
    if (!skill || !level) {
      return [];
    }

    return quizBank?.[skill]?.[level] || [];
  }, [skill, level]);

  // ==========================================
  // SELECT SKILL
  // ==========================================

  const handleSkillChange = (selectedSkill) => {
    setSkill(selectedSkill);

    // Reset level because skill changed
    setLevel("");

    // Reset quiz
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  // ==========================================
  // SELECT LEVEL
  // ==========================================

  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);

    // Reset quiz
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  // ==========================================
  // START QUIZ
  // ==========================================

  const startQuiz = () => {
    if (!skill) {
      return;
    }

    if (!level) {
      return;
    }

    if (!questions.length) {
      alert(
        `No questions available for ${skill} - ${level}.`
      );
      return;
    }

    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setStarted(true);
  };

  // ==========================================
  // SELECT ANSWER
  // ==========================================

  const chooseAnswer = (answer) => {
    setAnswers((previous) => {
      const updated = [...previous];

      updated[questionIndex] = answer;

      return updated;
    });
  };

  // ==========================================
  // FINISH QUIZ
  // ==========================================

    const finishQuiz = async () => {
    const unanswered = questions.some(
        (_, index) => !answers[index]
    );

    if (unanswered) {
        alert(
        "Please answer all questions before finishing the quiz."
        );
        return;
    }

    const score = answers.reduce(
        (total, answer, index) => {
        return (
            total +
            (answer === questions[index]?.answer
            ? 1
            : 0)
        );
        },
        0
    );

    const totalQuestions = questions.length;

    const percentage =
        totalQuestions > 0
        ? Math.round(
            (score / totalQuestions) * 100
            )
        : 0;

    try {
        const response = await fetch(
        "http://localhost:5000/api/v1/quizzes",
        {
            method: "POST",

            headers: {
            "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
            skill,
            level,
            score,
            totalQuestions,
            percentage,
            }),
        }
        );

        const data = await response.json();

        console.log(
        "Quiz save response:",
        data
        );

        if (!response.ok) {
        alert(
            data.message ||
            "Failed to save quiz result."
        );
        return;
        }

        // Backend successfully saved the result
        setResult({
        _id: data.quiz._id,
        skill: data.quiz.skill,
        level: data.quiz.level,
        score: data.quiz.score,
        total: data.quiz.totalQuestions,
        percentage: data.quiz.percentage,
        completedAt: data.quiz.completedAt,
        });

    } catch (error) {
        console.error(
        "Quiz save error:",
        error
        );

        alert(
        "Unable to connect to the server."
        );
    }
    };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const handleNext = () => {
    if (!answers[questionIndex]) {
      return;
    }

    if (
      questionIndex ===
      questions.length - 1
    ) {
      finishQuiz();
      return;
    }

    setQuestionIndex(
      (previous) => previous + 1
    );
  };

  // ==========================================
  // PREVIOUS QUESTION
  // ==========================================

  const handlePrevious = () => {
    if (questionIndex === 0) {
      return;
    }

    setQuestionIndex(
      (previous) => previous - 1
    );
  };

  // ==========================================
  // TAKE ANOTHER QUIZ
  // ==========================================

  const takeAnotherQuiz = () => {
    setSkill("");
    setLevel("");
    setStarted(false);
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  // ==========================================
  // RESULT SCREEN
  // ==========================================

  if (result) {
    return (
      <div className="quiz-page">

        <div className="quiz-result">

          <div className="ai-badge">
            AI
          </div>

          <p className="eyebrow">
            QUIZ COMPLETE
          </p>

          <h1>
            {result.skill} Knowledge Check
          </h1>

          <p>
            {result.level} Level
          </p>

          <div className="quiz-score">
            {result.percentage}%
          </div>

          <p>
            {result.score} of{" "}
            {result.total} answers correct.
          </p>

          <div className="result-actions">

            <button
              type="button"
              onClick={takeAnotherQuiz}
            >
              Take Another Quiz
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                navigate("/skill-gaps")
              }
            >
              View Skill Gaps
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                navigate("/progress")
              }
            >
              View Progress
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                navigate("/student-dashboard")
              }
            >
              Dashboard
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // SELECTION SCREEN
  // ==========================================

  if (!started) {
    return (
      <div className="quiz-page">

        <div className="quiz-selection">

          {/* BACK */}

          <button
            type="button"
            className="quiz-back"
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
          >
            ← Dashboard
          </button>

          {/* HEADER */}

          <div className="quiz-selection-header">

            <p className="eyebrow">
              AI QUIZ & MCQs
            </p>

            <h1>
              Choose Your Quiz
            </h1>

            <p>
              Select a skill and level.
              Practice questions are separate
              from skill-assessment questions.
            </p>

          </div>

          {/* SKILLS */}

          <section className="quiz-selection-section">

            <h2>
              1. Select Skill
            </h2>

            <div className="quiz-skill-grid">

              {skills.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`quiz-choice ${
                    skill === item
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleSkillChange(item)
                  }
                >

                  <span>
                    {skill === item
                      ? "✓"
                      : ""}
                  </span>

                  {item}

                </button>
              ))}

            </div>

          </section>

          {/* LEVELS */}

          <section className="quiz-selection-section">

            <h2>
              2. Select Level
            </h2>

            <div className="quiz-level-grid">

              {levels.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className={`quiz-level-choice ${
                    level === item.name
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleLevelChange(
                      item.name
                    )
                  }
                >

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {item.description}
                  </span>

                </button>
              ))}

            </div>

          </section>

          {/* SUMMARY */}

          {skill && level && (
            <div className="quiz-summary">

              <strong>
                Selected:
              </strong>

              {skill} • {level}

              <span>
                {questions.length} practice
                questions
              </span>

            </div>
          )}

          {/* START */}

          <button
            type="button"
            className="quiz-start"
            disabled={
              !skill ||
              !level ||
              !questions.length
            }
            onClick={startQuiz}
          >
            Start {skill || "Quiz"} →
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // SAFETY CHECK
  // ==========================================

  if (!questions.length) {
    return (
      <div className="quiz-page">

        <div className="quiz-result">

          <h2>
            Quiz unavailable
          </h2>

          <p>
            No questions are available for{" "}
            {skill} - {level}.
          </p>

          <button
            type="button"
            onClick={() =>
              setStarted(false)
            }
          >
            ← Back
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // CURRENT QUESTION
  // ==========================================

  const current =
    questions[questionIndex];

  const progress =
    ((questionIndex + 1) /
      questions.length) *
    100;

  // ==========================================
  // QUESTION SCREEN
  // ==========================================

  return (
    <div className="quiz-page">

      <div className="quiz-shell">

        {/* TOP */}

        <div className="quiz-top">

          <button
            type="button"
            onClick={() =>
              setStarted(false)
            }
          >
            ← Back
          </button>

          <div>

            <p className="eyebrow">
              AI QUIZ
            </p>

            <h1>
              {skill} • {level}
            </h1>

          </div>

          <strong>
            {questionIndex + 1}/
            {questions.length}
          </strong>

        </div>

        {/* PROGRESS */}

        <div className="quiz-progress">

          <span
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        {/* QUESTION CARD */}

        <div className="quiz-card">

          <span className="question-tag">

            {level} • Question{" "}
            {questionIndex + 1}

          </span>

          <h2>
            {current.question}
          </h2>

          {/* OPTIONS */}

          <div className="quiz-options">

            {current.options.map(
              (option, index) => (

                <button
                  type="button"
                  key={option}
                  className={
                    answers[questionIndex] ===
                    option
                      ? "chosen"
                      : ""
                  }
                  onClick={() =>
                    chooseAnswer(option)
                  }
                >

                  <span>
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  {option}

                </button>

              )
            )}

          </div>

          {/* ACTIONS */}

          <div className="quiz-actions">

            <button
              type="button"
              disabled={
                questionIndex === 0
              }
              onClick={
                handlePrevious
              }
            >
              ← Previous
            </button>

            <span>
              Practice • {skill} • {level}
            </span>

            <button
              type="button"
              disabled={
                !answers[questionIndex]
              }
              onClick={handleNext}
            >
              {questionIndex ===
              questions.length - 1
                ? "Finish Quiz"
                : "Next Question →"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}