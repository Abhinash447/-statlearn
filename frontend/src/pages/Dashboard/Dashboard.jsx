import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Dashboard.css";

const API_URL = "http://localhost:5000/api/v1";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/dashboard`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      console.log("Dashboard API response:", result);

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to load dashboard"
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
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    const refreshDashboard = () => {
      fetchDashboard();
    };

    window.addEventListener(
      "statlearn:data-changed",
      refreshDashboard
    );

    window.addEventListener(
      "storage",
      refreshDashboard
    );

    return () => {
      window.removeEventListener(
        "statlearn:data-changed",
        refreshDashboard
      );

      window.removeEventListener(
        "storage",
        refreshDashboard
      );
    };
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
        <p>
          Please wait while we load your learning data.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Unable to Load Dashboard</h2>

        <p>{error}</p>

        <button
          type="button"
          onClick={fetchDashboard}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user || !data) {
    return null;
  }

  const competency =
    data?.competency || {};

  const skills =
    competency?.profile ||
    data?.competencyProfile ||
    data?.skills ||
    [];

  const normalizedSkills = Array.isArray(skills)
    ? skills
    : Object.entries(skills).map(
        ([name, item]) => ({
          competencyName:
            item?.competencyName ||
            item?.skill ||
            name,
          score: Number(
            item?.score ??
              item?.latestScore ??
              item?.initialScore ??
              0
          ),
        })
      );

  const overall = Number(
    competency?.overall ??
      data?.overallCompetency ??
      data?.overall ??
      0
  );

  const skillsAssessed = Number(
    competency?.skillsAssessed ??
      data?.skillsAssessed ??
      normalizedSkills.length
  );

  const quiz =
    data?.quiz?.latest ||
    data?.latestQuiz ||
    data?.quiz ||
    null;

  const assessment =
    data?.assessment?.latest ||
    data?.latestAssessment ||
    data?.assessment ||
    null;

  const training =
    data?.training || {};

  const trainingCompleted = Number(
    training?.completed ??
      training?.completedCount ??
      data?.trainingCompleted ??
      0
  );

  const trainingTotal = Number(
    training?.total ??
      training?.totalModules ??
      0
  );

  const trainingProgress =
    trainingTotal > 0
      ? Math.round(
          (trainingCompleted /
            trainingTotal) *
            100
        )
      : trainingCompleted > 0
      ? 100
      : 0;

  const skillGaps = normalizedSkills
    .filter(
      (item) =>
        Number(item.score || 0) < 80
    )
    .sort(
      (a, b) =>
        Number(a.score || 0) -
        Number(b.score || 0)
    );

  const getGapLevel = (score) => {
    if (score < 60) {
      return "High";
    }

    if (score < 70) {
      return "Medium";
    }

    return "Low";
  };

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "Student";

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <main className="dashboard-content">
          <section className="welcome-section">
            <div>
              <h2>
                Welcome back, {userName}! 👋
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

          <section className="stats-grid">
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
                  {skillsAssessed
                    ? "Based on assessed skills"
                    : "No assessment yet"}
                </span>
              </div>
            </div>

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
                  {trainingTotal > 0
                    ? `${trainingCompleted}/${trainingTotal} modules`
                    : "Modules completed"}
                </span>
              </div>
            </div>

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
                    ? `${Number(
                        quiz.percentage ?? 0
                      )}%`
                    : "—"}
                </h3>

                <span className="positive">
                  {quiz
                    ? `Latest ${quiz.skill || "quiz"} quiz`
                    : "No quiz completed yet"}
                </span>
              </div>
            </div>
          </section>

          <section className="dashboard-grid">
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

              {normalizedSkills.length > 0 ? (
                normalizedSkills.map(
                  (item, index) => {
                    const skill =
                      item.competencyName ||
                      item.skill ||
                      `Skill ${index + 1}`;

                    const score = Math.min(
                      Math.max(
                        Number(
                          item.score || 0
                        ),
                        0
                      ),
                      100
                    );

                    return (
                      <div
                        className="skill"
                        key={`${skill}-${index}`}
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
                              width: `${score}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="gap-item">
                  <div>
                    <strong>
                      No competency data yet
                    </strong>

                    <p>
                      Take a skill assessment to
                      establish your competency profile.
                    </p>
                  </div>
                </div>
              )}
            </div>

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
                  .map((item, index) => {
                    const skill =
                      item.competencyName ||
                      item.skill ||
                      `Skill ${index + 1}`;

                    const score = Number(
                      item.score || 0
                    );

                    const level =
                      getGapLevel(score);

                    return (
                      <div
                        className="gap-item"
                        key={`${skill}-${index}`}
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
                      Complete an assessment to
                      identify areas for improvement.
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

          <section className="bottom-grid">
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
                    {skillGaps.length > 0
                      ? `${skillGaps[0].competencyName || skillGaps[0].skill} Learning Path`
                      : normalizedSkills.length > 0
                      ? "Continue Your Learning"
                      : "Start with a Skill Assessment"}
                  </h4>

                  <p>
                    {skillGaps.length > 0
                      ? `Improve your ${skillGaps[0].competencyName || skillGaps[0].skill} competency through personalized training.`
                      : normalizedSkills.length > 0
                      ? "Continue learning to strengthen your competencies."
                      : "Complete an assessment to receive personalized training."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      normalizedSkills.length > 0
                        ? "/training"
                        : "/skill-selection"
                    )
                  }
                >
                  {normalizedSkills.length > 0
                    ? "Start"
                    : "Assess"}
                </button>
              </div>

              {trainingCompleted > 0 && (
                <div className="training-progress">
                  <div>
                    <span>
                      Training Progress
                    </span>

                    <strong>
                      {trainingProgress}%
                    </strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${trainingProgress}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <div>
                  <h3>
                    Next Assessment / Quiz
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

                {quiz && (
                  <div className="quiz-last-result">
                    <strong>
                      Latest Score:{" "}
                      {Number(
                        quiz.percentage ?? 0
                      )}
                      %
                    </strong>

                    <span>
                      {quiz.skill || "Quiz"}
                      {quiz.level
                        ? ` • ${quiz.level}`
                        : ""}
                    </span>
                  </div>
                )}

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
                  {quiz
                    ? "Take Another Quiz →"
                    : "Start Quiz →"}
                </button>
              </div>
            </div>
          </section>

          {assessment && (
            <section className="dashboard-card">
              <div className="card-header">
                <div>
                  <h3>
                    Latest Assessment
                  </h3>

                  <p>
                    Your most recent competency
                    assessment
                  </p>
                </div>
              </div>

              <div className="training-item">
                <div className="training-icon">
                  📊
                </div>

                <div className="training-info">
                  <h4>
                    {assessment.skill ||
                      "Skill Assessment"}
                  </h4>

                  <p>
                    Score:{" "}
                    {Number(
                      assessment.percentage ??
                        assessment.score ??
                        0
                    )}
                    %
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/assessment"
                    )
                  }
                >
                  Assess Again
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}