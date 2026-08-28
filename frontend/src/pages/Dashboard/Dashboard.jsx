import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // ============================================
  // STATE
  // ============================================

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================
  // FETCH DASHBOARD DATA
  // ============================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/v1/dashboard",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        console.log("Dashboard API response:", result);

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load dashboard"
          );
        }

        if (!result.user) {
          throw new Error(
            "User information was not returned by the server."
          );
        }

        setUser(result.user);
        setData(result);
      } catch (error) {
        console.error("Dashboard Error:", error);

        setError(
          error.message ||
            "Unable to load dashboard. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ============================================
  // LOADING STATE
  // ============================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
        <p>Please wait while we load your learning data.</p>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Unable to Load Dashboard</h2>

        <p>{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // ============================================
  // USER CHECK
  // ============================================

  if (!user || !data) {
    return null;
  }

  // ============================================
  // DASHBOARD DATA
  // ============================================

  const skills = data?.competency?.profile || [];

  const overall = Number(
    data?.competency?.overall || 0
  );

  const skillsAssessed = Number(
    data?.competency?.skillsAssessed ||
      skills.length
  );

  const quiz = data?.quiz?.latest || null;

  const trainingCompleted = Number(
    data?.training?.completed || 0
  );

  // ============================================
  // SKILL GAPS
  // ============================================

  const skillGaps = skills
    .filter(
      (item) => Number(item.score || 0) < 80
    )
    .sort(
      (a, b) =>
        Number(a.score || 0) -
        Number(b.score || 0)
    );

  // ============================================
  // HELPER
  // ============================================

  const getGapLevel = (score) => {
    if (score < 60) {
      return "High";
    }

    if (score < 70) {
      return "Medium";
    }

    return "Low";
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="dashboard">

      {/* ========================================
          SIDEBAR
      ========================================= */}

      <Sidebar />

      {/* ========================================
          MAIN CONTENT
      ========================================= */}

      <div className="dashboard-main">

        <Topbar />

        <main className="dashboard-content">

          {/* ======================================
              WELCOME SECTION
          ======================================= */}

          <section className="welcome-section">

            <div>
              <h2>
                Welcome back,{" "}
                {user.name ||
                  user.fullName ||
                  "Student"}{" "}
               ! 👋
              </h2>

              <p>
                Continue your learning journey and
                strengthen your competencies.
              </p>
            </div>

            <button
              type="button"
              className="assessment-btn"
              onClick={() =>
                navigate("/skill-selection")
              }
            >
              Take Skill Assessment →
            </button>

          </section>

          {/* ======================================
              STATISTICS
          ======================================= */}

          <section className="stats-grid">

            {/* Overall Competency */}

            <div className="stat-card">

              <div className="stat-icon">
                ✓
              </div>

              <div>
                <p>
                  Overall Competency
                </p>

                <h3>
                  {overall}%
                </h3>

                <span className="positive">
                  {skills.length
                    ? "Based on assessed skills"
                    : "No assessment yet"}
                </span>
              </div>

            </div>

            {/* Skills Assessed */}

            <div className="stat-card">

              <div className="stat-icon">
                ◈
              </div>

              <div>
                <p>
                  Skills Assessed
                </p>

                <h3>
                  {skillsAssessed}
                </h3>

                <span>
                  {skillsAssessed
                    ? "Completed skills"
                    : "Start your first assessment"}
                </span>
              </div>

            </div>

            {/* Training Completed */}

            <div className="stat-card">

              <div className="stat-icon">
                ▣
              </div>

              <div>
                <p>
                  Training Completed
                </p>

                <h3>
                  {trainingCompleted}
                </h3>

                <span>
                  Modules completed
                </span>
              </div>

            </div>

            {/* Quiz Score */}

            <div className="stat-card">

              <div className="stat-icon">
                ★
              </div>

              <div>
                <p>
                  Quiz Score
                </p>

                <h3>
                  {quiz
                    ? `${quiz.percentage}%`
                    : "—"}
                </h3>

                <span className="positive">
                  {quiz
                    ? "Latest quiz"
                    : "No quiz completed yet"}
                </span>
              </div>

            </div>

          </section>

          {/* ======================================
              COMPETENCY + SKILL GAPS
          ======================================= */}

          <section className="dashboard-grid">

            {/* ====================================
                COMPETENCY OVERVIEW
            ===================================== */}

            <div className="dashboard-card competency-card">

              <div className="card-header">

                <div>
                  <h3>
                    Competency Overview
                  </h3>

                  <p>
                    Your current skill levels
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/progress")
                  }
                >
                  View Details
                </button>

              </div>

              {skills.length > 0 ? (

                skills.map((item) => {

                  const skill =
                    item.competencyName ||
                    "Unknown Skill";

                  const score = Number(
                    item.score || 0
                  );

                  return (
                    <div
                      className="skill"
                      key={skill}
                    >

                      <div className="skill-info">

                        <span>
                          {skill}
                        </span>

                        <strong>
                          {score}%
                        </strong>

                      </div>

                      <div className="progress">

                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.min(
                              Math.max(score, 0),
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })

              ) : (

                <div className="gap-item">

                  <div>

                    <strong>
                      No competency data yet
                    </strong>

                    <p>
                      Take a skill assessment
                      to establish your
                      competency profile.
                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* ====================================
                SKILL GAPS
            ===================================== */}

            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <h3>
                    Skill Gaps
                  </h3>

                  <p>
                    Areas that need improvement
                  </p>
                </div>

                <span className="ai-label">
                  AI Powered
                </span>

              </div>

              {skillGaps.length > 0 ? (

                skillGaps
                  .slice(0, 3)
                  .map((item) => {

                    const skill =
                      item.competencyName ||
                      "Unknown Skill";

                    const score = Number(
                      item.score || 0
                    );

                    const level =
                      getGapLevel(score);

                    return (
                      <div
                        className="gap-item"
                        key={skill}
                      >

                        <div>

                          <strong>
                            {skill}
                          </strong>

                          <p>
                            Current level:{" "}
                            {score}%
                          </p>

                        </div>

                        <span
                          className={`gap-${level.toLowerCase()}`}
                        >
                          {level}
                        </span>

                      </div>
                    );
                  })

              ) : (

                <div className="gap-item">

                  <div>

                    <strong>
                      No gaps yet
                    </strong>

                    <p>
                      Complete an assessment
                      to identify areas for
                      improvement.
                    </p>

                  </div>

                </div>

              )}

              <button
                type="button"
                className="recommend-btn"
                onClick={() =>
                  navigate("/skill-gaps")
                }
              >
                View Personalized
                Recommendations →
              </button>

            </div>

          </section>

          {/* ======================================
              TRAINING + QUIZ
          ======================================= */}

          <section className="bottom-grid">

            {/* ====================================
                RECOMMENDED TRAINING
            ===================================== */}

            <div className="dashboard-card">

              <div className="card-header">

                <div>

                  <h3>
                    Recommended Training
                  </h3>

                  <p>
                    Based on your competency gaps
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/training")
                  }
                >
                  View All
                </button>

              </div>

              <div className="training-item">

                <div className="training-icon">
                  📚
                </div>

                <div className="training-info">

                  <h4>
                    {skills.length > 0
                      ? "Personalized Learning Path"
                      : "Start with a Skill Assessment"}
                  </h4>

                  <p>
                    {skills.length > 0
                      ? "Practice the areas where your competency is below target."
                      : "Complete an assessment to receive personalized training."}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      skills.length > 0
                        ? "/training"
                        : "/skill-selection"
                    )
                  }
                >
                  {skills.length > 0
                    ? "Start"
                    : "Assess"}
                </button>

              </div>

            </div>

            {/* ====================================
                NEXT ASSESSMENT / QUIZ
            ===================================== */}

            <div className="dashboard-card">

              <div className="card-header">

                <div>

                  <h3>
                    Next Assessment
                  </h3>

                  <p>
                    Test your knowledge
                  </p>

                </div>

              </div>

              <div className="quiz-box">

                <div className="quiz-icon">
                  🧠
                </div>

                <h4>
                  AI Knowledge Check
                </h4>

                <p>
                  Practice with skill and
                  level-specific MCQs.
                </p>

                <div className="quiz-details">

                  <span>
                    ⏱ Practice
                  </span>

                  <span>
                    🎯 Adaptive
                  </span>

                </div>

                <button
                  type="button"
                  className="start-quiz"
                  onClick={() =>
                    navigate("/quiz")
                  }
                >
                  Start Quiz →
                </button>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}