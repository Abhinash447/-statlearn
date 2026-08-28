import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Progress.css";

const API_URL = "http://localhost:5000/api/v1";

export default function Progress() {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH ASSESSMENTS + QUIZZES
  // ==========================================

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        setError("");

        // --------------------------------------
        // Fetch assessments
        // --------------------------------------

        const assessmentResponse = await fetch(
          `${API_URL}/assessments/my`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const assessmentData =
          await assessmentResponse.json();

        console.log(
          "Assessment API:",
          assessmentData
        );

        if (!assessmentResponse.ok) {
          if (
            assessmentResponse.status === 401
          ) {
            navigate("/login", {
              replace: true,
            });

            return;
          }

          throw new Error(
            assessmentData.message ||
              "Failed to load assessments."
          );
        }

        setAssessments(
          Array.isArray(
            assessmentData.assessments
          )
            ? assessmentData.assessments
            : []
        );

        // --------------------------------------
        // Fetch quizzes
        // --------------------------------------

        const quizResponse = await fetch(
          `${API_URL}/quizzes/my`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const quizData =
          await quizResponse.json();

        console.log(
          "Quiz API:",
          quizData
        );

        if (!quizResponse.ok) {
          if (
            quizResponse.status === 401
          ) {
            navigate("/login", {
              replace: true,
            });

            return;
          }

          throw new Error(
            quizData.message ||
              "Failed to load quizzes."
          );
        }

        setQuizzes(
          Array.isArray(quizData.quizzes)
            ? quizData.quizzes
            : []
        );

      } catch (err) {
        console.error(
          "Progress loading error:",
          err
        );

        setError(
          err.message ||
            "Unable to load your progress."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [navigate]);

  // ==========================================
  // LATEST ASSESSMENT
  // ==========================================

  const latestAssessment = useMemo(() => {
    if (!assessments.length) {
      return null;
    }

    return [...assessments].sort(
      (a, b) =>
        new Date(
          b.completedAt ||
            b.createdAt
        ) -
        new Date(
          a.completedAt ||
            a.createdAt
        )
    )[0];
  }, [assessments]);

  // ==========================================
  // LATEST QUIZ
  // ==========================================

  const latestQuiz = useMemo(() => {
    if (!quizzes.length) {
      return null;
    }

    return [...quizzes].sort(
      (a, b) =>
        new Date(
          b.completedAt ||
            b.createdAt
        ) -
        new Date(
          a.completedAt ||
            a.createdAt
        )
    )[0];
  }, [quizzes]);

  // ==========================================
  // UNIQUE ASSESSED SKILLS
  // ==========================================

  const skills = useMemo(() => {
    return [
      ...new Set(
        assessments
          .map(
            (assessment) =>
              assessment.skill
          )
          .filter(Boolean)
      ),
    ];
  }, [assessments]);

  // ==========================================
  // OVERALL COMPETENCY
  // ==========================================

  const overallCompetency = useMemo(() => {
    if (!assessments.length) {
      return 0;
    }

    const latestBySkill = {};

    assessments.forEach((assessment) => {
      if (!assessment.skill) {
        return;
      }

      const existing =
        latestBySkill[
          assessment.skill
        ];

      const currentDate =
        new Date(
          assessment.completedAt ||
            assessment.createdAt
        );

      const existingDate = existing
        ? new Date(
            existing.completedAt ||
              existing.createdAt
          )
        : null;

      if (
        !existing ||
        currentDate > existingDate
      ) {
        latestBySkill[
          assessment.skill
        ] = assessment;
      }
    });

    const latestScores =
      Object.values(
        latestBySkill
      ).map(
        (assessment) =>
          Number(
            assessment.percentage
          ) || 0
      );

    if (!latestScores.length) {
      return 0;
    }

    const total =
      latestScores.reduce(
        (sum, score) =>
          sum + score,
        0
      );

    return Math.round(
      total / latestScores.length
    );
  }, [assessments]);

  // ==========================================
  // TRAINING
  // ==========================================

  // Training backend is not connected yet.
  const completedTraining = 0;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="progress-page">
        <div className="progress-shell">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
          >
            ← Dashboard
          </button>

          <div className="progress-loading">
            Loading your progress...
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="progress-page">
        <div className="progress-shell">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
          >
            ← Dashboard
          </button>

          <div className="progress-error">

            <h2>
              Unable to load progress
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="progress-page">

      <div className="progress-shell">

        {/* DASHBOARD */}

        <button
          type="button"
          onClick={() =>
            navigate(
              "/student-dashboard"
            )
          }
        >
          ← Dashboard
        </button>

        {/* HEADER */}

        <p className="eyebrow">
          LEARNING ANALYTICS
        </p>

        <h1>
          My Progress
        </h1>

        <p className="muted">
          Track your competency changes
          after assessment, training and
          quizzes.
        </p>

        {/* =====================================
            PROGRESS CARDS
        ===================================== */}

        <div className="progress-grid">

          {/* OVERALL */}

          <div className="progress-card">

            <span>
              Overall competency
            </span>

            <strong>
              {overallCompetency}%
            </strong>

            <small>
              {skills.length
                ? `${skills.length} skill${
                    skills.length > 1
                      ? "s"
                      : ""
                  } assessed`
                : "No assessment completed yet"}
            </small>

          </div>

          {/* ASSESSMENT */}

          <div className="progress-card">

            <span>
              Latest assessment
            </span>

            <strong>
              {latestAssessment
                ? `${latestAssessment.percentage}%`
                : "—"}
            </strong>

            <small>
              {latestAssessment?.skill ||
                "No assessment completed yet"}
            </small>

          </div>

          {/* QUIZ */}

          <div className="progress-card">

            <span>
              Latest AI quiz
            </span>

            <strong>
              {latestQuiz
                ? `${latestQuiz.percentage}%`
                : "—"}
            </strong>

            <small>
              {latestQuiz
                ? `${latestQuiz.skill} • ${latestQuiz.level}`
                : "No quiz completed yet"}
            </small>

          </div>

          {/* TRAINING */}

          <div className="progress-card">

            <span>
              Training completed
            </span>

            <strong>
              {completedTraining}
            </strong>

            <small>
              Modules completed
            </small>

          </div>

        </div>

        {/* =====================================
            SKILL PERFORMANCE
        ===================================== */}

        {assessments.length > 0 && (
          <div className="timeline">

            <h2>
              Skill Performance
            </h2>

            {Object.entries(
              assessments.reduce(
                (result, assessment) => {

                  if (!assessment.skill) {
                    return result;
                  }

                  const existing =
                    result[
                      assessment.skill
                    ];

                  if (
                    !existing ||
                    new Date(
                      assessment.completedAt ||
                        assessment.createdAt
                    ) >
                      new Date(
                        existing.completedAt ||
                          existing.createdAt
                      )
                  ) {
                    result[
                      assessment.skill
                    ] = assessment;
                  }

                  return result;

                },
                {}
              )
            ).map(
              ([skill, assessment]) => (

                <div key={skill}>

                  <b>
                    {skill
                      .substring(0, 2)
                      .toUpperCase()}
                  </b>

                  <p>

                    <strong>
                      {skill}
                    </strong>

                    <span>
                      {assessment.percentage}%
                      competency
                      {" • "}
                      {assessment.level}
                    </span>

                  </p>

                </div>

              )
            )}

          </div>
        )}

        {/* =====================================
            LEARNING JOURNEY
        ===================================== */}

        <div className="timeline">

          <h2>
            Learning Journey
          </h2>

          {/* 01 */}

          <div>

            <b>
              01
            </b>

            <p>

              <strong>
                Skill Assessment
              </strong>

              <span>
                {latestAssessment
                  ? `${latestAssessment.skill} assessed at ${latestAssessment.percentage}%`
                  : "Complete an assessment to establish your baseline."}
              </span>

            </p>

          </div>

          {/* 02 */}

          <div>

            <b>
              02
            </b>

            <p>

              <strong>
                AI Gap Analysis
              </strong>

              <span>
                {skills.length
                  ? "Weak competencies are prioritized for training."
                  : "Gap analysis starts after assessment."}
              </span>

            </p>

          </div>

          {/* 03 */}

          <div>

            <b>
              03
            </b>

            <p>

              <strong>
                Personalized Training
              </strong>

              <span>
                {completedTraining
                  ? `${completedTraining} module${
                      completedTraining > 1
                        ? "s"
                        : ""
                    } completed.`
                  : "Recommended modules appear from your skill gaps."}
              </span>

            </p>

          </div>

          {/* 04 */}

          <div>

            <b>
              04
            </b>

            <p>

              <strong>
                Re-evaluation
              </strong>

              <span>
                {latestAssessment?.type ===
                "reEvaluation"
                  ? `Latest re-evaluation: ${latestAssessment.percentage}%.`
                  : "Post-training assessment updates your competency profile."}
              </span>

            </p>

          </div>

        </div>

        {/* =====================================
            ASSESSMENT HISTORY
        ===================================== */}

        {assessments.length > 0 && (
          <div className="timeline">

            <h2>
              Assessment History
            </h2>

            {assessments.map(
              (assessment) => (

                <div
                  key={
                    assessment._id
                  }
                >

                  <b>
                    {assessment.percentage}%
                  </b>

                  <p>

                    <strong>
                      {assessment.skill}
                    </strong>

                    <span>
                      {assessment.level}
                      {" • "}
                      {assessment.score}/
                      {assessment.totalQuestions}
                      {" • "}
                      {assessment.type ||
                        "initial"}
                    </span>

                  </p>

                </div>

              )
            )}

          </div>
        )}

        {/* =====================================
            QUIZ HISTORY
        ===================================== */}

        {quizzes.length > 0 && (
          <div className="timeline">

            <h2>
              Quiz History
            </h2>

            {quizzes.map(
              (quiz) => (

                <div
                  key={quiz._id}
                >

                  <b>
                    {quiz.percentage}%
                  </b>

                  <p>

                    <strong>
                      {quiz.skill}
                    </strong>

                    <span>
                      {quiz.level}
                      {" • "}
                      {quiz.score}/
                      {quiz.totalQuestions}
                    </span>

                  </p>

                </div>

              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}