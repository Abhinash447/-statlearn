import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SkillGaps.css";

const API_URL = "http://localhost:5000/api/v1";

export default function SkillGaps() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSkillGaps = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/skills/gap-analysis`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      console.log("Skill Gap API Response:", result);

      if (!response.ok) {
        if (response.status === 401) {
          setError(
            "You are not authenticated. Please login again."
          );
          return;
        }

        throw new Error(
          result.message ||
            "Failed to load skill gaps."
        );
      }

      setSkills(
        Array.isArray(result.fullGapAnalysis)
          ? result.fullGapAnalysis
          : []
      );
    } catch (error) {
      console.error("Skill Gap Error:", error);

      setError(
        error.message ||
          "Unable to load skill gap data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkillGaps();

    const handleDataChange = () => {
      loadSkillGaps();
    };

    window.addEventListener(
      "statlearn:data-changed",
      handleDataChange
    );

    return () => {
      window.removeEventListener(
        "statlearn:data-changed",
        handleDataChange
      );
    };
  }, []);

  const gaps = skills
    .filter(
      (item) =>
        Number(item.currentScore || 0) <
        Number(item.targetScore || 0)
    )
    .sort(
      (a, b) =>
        Number(a.currentScore || 0) -
        Number(b.currentScore || 0)
    );

  const getGapLevel = (item) => {
    const score = Number(
      item.currentScore || 0
    );

    if (item.isCritical || score < 50) {
      return "High";
    }

    if (score < 70) {
      return "Medium";
    }

    return "Low";
  };

  const getTrainingLevel = (item) => {
    const score = Number(
      item.currentScore || 0
    );

    if (score < 60) {
      return "Beginner";
    }

    if (score < 80) {
      return "Intermediate";
    }

    return "Advanced";
  };

  if (loading) {
    return (
      <div className="gap-page">
        <div className="gap-shell">
          <button
            className="back-button"
            onClick={() =>
              navigate("/student-dashboard")
            }
          >
            ← Dashboard
          </button>

          <div className="no-gaps">
            <h2>
              Analyzing your competency...
            </h2>

            <p>
              Loading your latest assessment
              results.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gap-page">
        <div className="gap-shell">
          <button
            className="back-button"
            onClick={() =>
              navigate("/student-dashboard")
            }
          >
            ← Dashboard
          </button>

          <div className="no-gaps">
            <h2>
              Unable to load skill gaps
            </h2>

            <p>{error}</p>

            <button
              className="primary"
              onClick={loadSkillGaps}
            >
              Try Again
            </button>

            <button
              className="primary"
              onClick={() =>
                navigate("/skill-selection")
              }
            >
              Take Skill Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-page">
      <div className="gap-shell">
        <button
          className="back-button"
          onClick={() =>
            navigate("/student-dashboard")
          }
        >
          ← Dashboard
        </button>

        <div className="gap-head">
          <div>
            <p className="eyebrow">
              AI COMPETENCY ANALYSIS
            </p>

            <h1>
              Your Skill Gaps
            </h1>

            <p>
              Your competency gaps are calculated
              from your latest assessment results.
            </p>
          </div>

          <button
            className="primary"
            onClick={() =>
              navigate("/skill-selection")
            }
          >
            {skills.length
              ? "Reassess a Skill"
              : "Take Skill Assessment"}
          </button>
        </div>

        {skills.length === 0 && (
          <div className="no-gaps">
            <h2>
              No skill gaps identified yet
            </h2>

            <p>
              Complete a skill assessment to
              identify your competency gaps.
            </p>

            <button
              className="primary"
              onClick={() =>
                navigate("/skill-selection")
              }
            >
              Take Skill Assessment →
            </button>
          </div>
        )}

        {skills.length > 0 &&
          gaps.length === 0 && (
            <div className="no-gaps">
              <h2>
                No significant gaps found
              </h2>

              <p>
                Your assessed competencies are
                currently at or above their target
                benchmarks.
              </p>
            </div>
          )}

        {gaps.length > 0 && (
          <div className="gap-grid">
            {gaps.map((item) => {
              const score = Number(
                item.currentScore || 0
              );

              const target = Number(
                item.targetScore || 0
              );

              const gap = Number(
                item.gapScore ||
                  Math.max(
                    0,
                    target - score
                  )
              );

              const level =
                getGapLevel(item);

              return (
                <div
                  className="gap-card"
                  key={
                    item.competencyName
                  }
                >
                  <div className="gap-title">
                    <div>
                      <h2>
                        {
                          item.competencyName
                        }
                      </h2>

                      <p>
                        Current competency:{" "}
                        {score}% • Target:{" "}
                        {target}%
                      </p>
                    </div>

                    <span
                      className={level.toLowerCase()}
                    >
                      {level}
                    </span>
                  </div>

                  <div className="gap-bar">
                    <span
                      style={{
                        width: `${Math.min(
                          score,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="gap-foot">
                    <div>
                      <strong>
                        {score}%
                      </strong>

                      <small>
                        Gap: {gap}%
                      </small>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          "/training",
                          {
                            state: {
                              skill:
                                item.competencyName,
                              level:
                                getTrainingLevel(
                                  item
                                ),
                              percentage:
                                score,
                            },
                          }
                        )
                      }
                    >
                      Get Training →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}