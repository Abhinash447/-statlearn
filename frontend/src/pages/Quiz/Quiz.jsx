import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const API_URL = "http://localhost:5000/api/v1";

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

  // ==========================================
  // SELECTION
  // ==========================================

  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");

  // ==========================================
  // QUIZ
  // ==========================================

  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Store selected option INDEX
  const [answers, setAnswers] = useState([]);

  // ==========================================
  // RESULT
  // ==========================================

  const [result, setResult] = useState(null);

  // ==========================================
  // LOADING / ERROR
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // RESET QUIZ
  // ==========================================

  const resetQuiz = () => {
    setQuizId(null);
    setQuestions([]);
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setError("");
  };

  // ==========================================
  // SELECT SKILL
  // ==========================================

  const handleSkillChange = (selectedSkill) => {
    setSkill(selectedSkill);
    setLevel("");
    resetQuiz();
  };

  // ==========================================
  // SELECT LEVEL
  // ==========================================

  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);
    resetQuiz();
  };

  // ==========================================
  // GET TRAINING MATERIAL
  // ==========================================

  const findTrainingMaterial = async () => {
    const response = await fetch(
      `${API_URL}/training`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch training materials."
      );
    }

    /*
      Your training controller may return:

      {
        materials: [...]
      }

      or:

      {
        trainingMaterials: [...]
      }

      or:

      {
        data: [...]
      }

      We support all three.
    */

    const materials =
      data.materials ||
      data.trainingMaterials ||
      data.data ||
      [];

    if (!Array.isArray(materials)) {
      throw new Error(
        "Invalid training material response."
      );
    }

    const matchingMaterial =
      materials.find(
        (material) =>
          material.skill?.toLowerCase() ===
            skill.toLowerCase() &&
          material.level?.toLowerCase() ===
            level.toLowerCase() &&
          material.isActive !== false
      );

    return matchingMaterial;
  };

  // ==========================================
  // START AI QUIZ
  // ==========================================

  const startQuiz = async () => {
    if (!skill || !level) {
      setError(
        "Please select both skill and level."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      resetQuiz();

      // ======================================
      // STEP 1
      // FIND TRAINING MATERIAL
      // ======================================

      const training =
        await findTrainingMaterial();

      if (!training) {
        throw new Error(
          `No training material found for ${skill} - ${level}.`
        );
      }

      if (
        !training.lessons ||
        training.lessons.length === 0
      ) {
        throw new Error(
          "This training material does not contain any lessons yet."
        );
      }

      console.log(
        "Training selected:",
        training
      );

      // ======================================
      // STEP 2
      // ASK GEMINI TO GENERATE QUIZ
      // ======================================

      const generateResponse =
        await fetch(
          `${API_URL}/ai/generate-quiz`,
          {
            method: "POST",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              trainingId: training._id,
              questionCount: 5,
            }),
          }
        );

      const generateData =
        await generateResponse.json();

      console.log(
        "AI Quiz generation:",
        generateData
      );

      if (!generateResponse.ok) {
        throw new Error(
          generateData.message ||
            "Failed to generate AI quiz."
        );
      }

      if (!generateData.quizId) {
        throw new Error(
          "AI quiz was generated but no quiz ID was returned."
        );
      }

      // ======================================
      // STEP 3
      // GET GENERATED QUIZ
      // ======================================

      const quizResponse =
        await fetch(
          `${API_URL}/ai/quizzes/${generateData.quizId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

      const quizData =
        await quizResponse.json();

      console.log(
        "Generated quiz:",
        quizData
      );

      if (!quizResponse.ok) {
        throw new Error(
          quizData.message ||
            "Failed to load generated quiz."
        );
      }

      if (
        !quizData.questions ||
        quizData.questions.length === 0
      ) {
        throw new Error(
          "AI generated quiz contains no questions."
        );
      }

      // ======================================
      // STEP 4
      // STORE QUIZ
      // ======================================

      setQuizId(quizData.quizId);

      setQuestions(
        quizData.questions
      );

      setAnswers(
        new Array(
          quizData.questions.length
        ).fill(null)
      );

      setQuestionIndex(0);

      setResult(null);

    } catch (err) {
      console.error(
        "Start AI Quiz Error:",
        err
      );

      setError(
        err.message ||
          "Unable to generate AI quiz."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SELECT ANSWER
  // ==========================================

  const chooseAnswer = (optionIndex) => {
    setAnswers((previous) => {
      const updated = [...previous];

      updated[questionIndex] =
        optionIndex;

      return updated;
    });
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
  // SUBMIT QUIZ
  // ==========================================

  const submitQuiz = async () => {
    if (!quizId) {
      setError(
        "Quiz session not found."
      );
      return;
    }

    // Check unanswered questions
    const unanswered = answers.some(
      (answer) => answer === null
    );

    if (unanswered) {
      setError(
        "Please answer all questions before finishing the quiz."
      );

      return;
    }

    try {
      setSubmitting(true);
      setError("");

      // ======================================
      // FORMAT ANSWERS FOR BACKEND
      // ======================================

      const formattedAnswers =
        questions.map(
          (question, index) => ({
            questionId:
              question.questionId,

            selectedOptionIndex:
              answers[index],
          })
        );

      console.log(
        "Submitting answers:",
        formattedAnswers
      );

      // ======================================
      // SUBMIT TO BACKEND
      // ======================================

      const response =
        await fetch(
          `${API_URL}/ai/quizzes/submit`,
          {
            method: "POST",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              quizId,
              answers:
                formattedAnswers,
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "Quiz result:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit quiz."
        );
      }

      // ======================================
      // SHOW RESULT
      // ======================================

      setResult(data);

    } catch (err) {
      console.error(
        "Submit Quiz Error:",
        err
      );

      setError(
        err.message ||
          "Unable to submit quiz."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const handleNext = () => {
    if (
      answers[questionIndex] === null ||
      answers[questionIndex] === undefined
    ) {
      setError(
        "Please select an answer first."
      );

      return;
    }

    setError("");

    if (
      questionIndex ===
      questions.length - 1
    ) {
      submitQuiz();
      return;
    }

    setQuestionIndex(
      (previous) => previous + 1
    );
  };

  // ==========================================
  // TAKE ANOTHER QUIZ
  // ==========================================

  const takeAnotherQuiz = () => {
    setSkill("");
    setLevel("");
    resetQuiz();
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
            AI QUIZ COMPLETE
          </p>

          <h1>
            {skill} Knowledge Check
          </h1>

          <p>
            {level} Level
          </p>

          <div className="quiz-score">
            {result.scorePercentage}%
          </div>

          <p>
            {result.correctAnswersCount}{" "}
            of{" "}
            {result.totalQuestions}{" "}
            answers correct.
          </p>

          {/* ================================
              RESULT SUMMARY
          ================================= */}

          <div className="quiz-result-summary">

            <div>
              <strong>
                {result.scorePercentage}%
              </strong>

              <span>
                Score
              </span>
            </div>

            <div>
              <strong>
                {result.correctAnswersCount}
              </strong>

              <span>
                Correct
              </span>
            </div>

            <div>
              <strong>
                {result.totalQuestions}
              </strong>

              <span>
                Questions
              </span>
            </div>

          </div>

          {/* ================================
              QUESTION REVIEW
          ================================= */}

          {result.itemizedResults &&
            result.itemizedResults.length >
              0 && (
              <div className="quiz-review">

                <h2>
                  Answer Review
                </h2>

                {result.itemizedResults.map(
                  (item, index) => (
                    <div
                      className="quiz-review-item"
                      key={item.questionId}
                    >

                      <h3>
                        Question {index + 1}
                      </h3>

                      <p>
                        {item.questionText}
                      </p>

                      <p>
                        <strong>
                          Your answer:
                        </strong>{" "}
                        {item.selectedOptionIndex !==
                        null
                          ? item.selectedOptionIndex +
                            1
                          : "Not answered"}
                      </p>

                      <p>
                        <strong>
                          Correct answer:
                        </strong>{" "}
                        {item.correctOptionIndex +
                          1}
                      </p>

                      <p>
                        {item.isCorrect
                          ? "✓ Correct"
                          : "✗ Incorrect"}
                      </p>

                      {item.explanation && (
                        <p>
                          <strong>
                            Explanation:
                          </strong>{" "}
                          {item.explanation}
                        </p>
                      )}

                    </div>
                  )
                )}

              </div>
            )}

          {/* ================================
              ACTIONS
          ================================= */}

          <div className="result-actions">

            <button
              type="button"
              onClick={
                takeAnotherQuiz
              }
            >
              Take Another Quiz
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                navigate(
                  "/skill-gaps"
                )
              }
            >
              View Skill Gaps
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                navigate(
                  "/progress"
                )
              }
            >
              View Progress
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                navigate(
                  "/student-dashboard"
                )
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
  // LOADING / GENERATING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="quiz-result">

          <div className="ai-badge">
            AI
          </div>

          <p className="eyebrow">
            AI QUIZ GENERATION
          </p>

          <h1>
            Generating Your Quiz...
          </h1>

          <p>
            Gemini AI is analyzing your
            {` ${skill} `}
            {level} training material
            and creating personalized
            MCQs.
          </p>

          <div className="quiz-loading">
            Please wait...
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // QUIZ SCREEN
  // ==========================================

  if (
    questions.length > 0 &&
    quizId
  ) {
    const currentQuestion =
      questions[questionIndex];

    const progress =
      ((questionIndex + 1) /
        questions.length) *
      100;

    return (
      <div className="quiz-page">

        <div className="quiz-shell">

          {/* ================================
              TOP
          ================================= */}

          <div className="quiz-top">

            <button
              type="button"
              onClick={() => {
                resetQuiz();
              }}
            >
              ← Back
            </button>

            <div>

              <p className="eyebrow">
                AI GENERATED QUIZ
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

          {/* ================================
              PROGRESS
          ================================= */}

          <div className="quiz-progress">

            <span
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {/* ================================
              ERROR
          ================================= */}

          {error && (
            <div className="quiz-error">
              {error}
            </div>
          )}

          {/* ================================
              QUESTION
          ================================= */}

          <div className="quiz-card">

            <span className="question-tag">
              {level} • Question{" "}
              {questionIndex + 1}
            </span>

            <h2>
              {currentQuestion.questionText}
            </h2>

            {/* ============================
                OPTIONS
            ============================= */}

            <div className="quiz-options">

              {currentQuestion.options.map(
                (option, index) => (

                  <button
                    type="button"
                    key={index}
                    className={
                      answers[
                        questionIndex
                      ] === index
                        ? "chosen"
                        : ""
                    }
                    onClick={() =>
                      chooseAnswer(
                        index
                      )
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

            {/* ============================
                ACTIONS
            ============================= */}

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
                AI Practice •{" "}
                {skill} • {level}
              </span>

              <button
                type="button"
                disabled={
                  submitting ||
                  answers[
                    questionIndex
                  ] === null ||
                  answers[
                    questionIndex
                  ] === undefined
                }
                onClick={
                  handleNext
                }
              >
                {questionIndex ===
                questions.length - 1
                  ? submitting
                    ? "Submitting..."
                    : "Finish Quiz"
                  : "Next Question →"}
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // SELECTION SCREEN
  // ==========================================

  return (
    <div className="quiz-page">

      <div className="quiz-selection">

        {/* ================================
            BACK
        ================================= */}

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

        {/* ================================
            HEADER
        ================================= */}

        <div className="quiz-selection-header">

          <p className="eyebrow">
            AI QUIZ & MCQs
          </p>

          <h1>
            Choose Your Quiz
          </h1>

          <p>
            Select a skill and level.
            Gemini AI will generate
            questions from the corresponding
            training material.
          </p>

        </div>

        {/* ================================
            ERROR
        ================================= */}

        {error && (
          <div className="quiz-error">
            {error}
          </div>
        )}

        {/* ================================
            SKILLS
        ================================= */}

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
                  handleSkillChange(
                    item
                  )
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

        {/* ================================
            LEVELS
        ================================= */}

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

        {/* ================================
            SUMMARY
        ================================= */}

        {skill && level && (
          <div className="quiz-summary">

            <strong>
              Selected:
            </strong>

            {skill} • {level}

            <span>
              Gemini will generate 5
              questions from training
              material.
            </span>

          </div>
        )}

        {/* ================================
            START
        ================================= */}

        <button
          type="button"
          className="quiz-start"
          disabled={
            !skill ||
            !level ||
            loading
          }
          onClick={startQuiz}
        >
          {loading
            ? "Generating AI Quiz..."
            : `Start ${skill || "Quiz"} →`}
        </button>

      </div>

    </div>
  );
}