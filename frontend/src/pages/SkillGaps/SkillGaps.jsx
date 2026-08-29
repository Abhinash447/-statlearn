import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SkillGaps.css";

const API_URL =
  "http://localhost:5000/api/v1";

export default function SkillGaps() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

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

      const data =
        await response.json();

      console.log(
        "Skill Gap Response:",
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
            "Failed to load skill gaps."
        );
      }

      setSkills(
        data.skills || []
      );
    } catch (error) {
      console.error(
        "Skill Gap Error:",
        error
      );

      setError(
        error.message ||
          "Unable to load skill gaps."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkillGaps();
  }, []);

  const gaps = skills
    .filter(
      (item) =>
        item.score < item.target
    )
    .sort(
      (a, b) =>
        a.score - b.score
    );

  return (
    <div className="gap-page">
      <div className="gap-shell">
        <button
          className="back-button"
          onClick={() =>
            navigate(
              "/student-dashboard"
            )
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
              Your competency gaps are
              calculated from your latest
              assessment results.
            </p>
          </div>

          <button
            className="primary"
            onClick={() =>
              navigate(
                "/skill-selection"
              )
            }
          >
            {skills.length
              ? "Reassess a Skill"
              : "Take Skill Assessment"}
          </button>
        </div>

        {loading && (
          <div className="no-gaps">
            <h2>
              Analyzing your competency...
            </h2>

            <p>
              Loading your assessment
              results.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="no-gaps">
            <h2>
              Unable to load skill gaps
            </h2>

            <p>{error}</p>

            <button
              className="primary"
              onClick={
                loadSkillGaps
              }
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          skills.length === 0 && (
            <div className="no-gaps">
              <h2>
                No skill gaps identified yet
              </h2>

              <p>
                Complete a skill assessment
                to identify your competency
                gaps.
              </p>

              <button
                className="primary"
                onClick={() =>
                  navigate(
                    "/skill-selection"
                  )
                }
              >
                Take Skill Assessment →
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          skills.length > 0 &&
          gaps.length === 0 && (
            <div className="no-gaps">
              <h2>
                No significant gaps found
              </h2>

              <p>
                Your assessed skills are
                currently at or above the
                80% target.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          gaps.length > 0 && (
            <div className="gap-grid">
              {gaps.map((item) => {
                const severity =
                  item.score < 60
                    ? "high"
                    : item.score < 70
                    ? "medium"
                    : "low";

                return (
                  <div
                    className="gap-card"
                    key={
                      item.assessmentId
                    }
                  >
                    <div className="gap-title">
                      <div>
                        <h2>
                          {item.skill}
                        </h2>

                        <p>
                          Current competency:{" "}
                          {item.score}%
                          {" • "}
                          Target:{" "}
                          {item.target}%
                        </p>
                      </div>

                      <span
                        className={severity}
                      >
                        {severity ===
                        "high"
                          ? "High"
                          : severity ===
                            "medium"
                          ? "Medium"
                          : "Low"}
                      </span>
                    </div>

                    <div className="gap-bar">
                      <span
                        style={{
                          width: `${Math.min(
                            item.score,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="gap-foot">
                      <div>
                        <strong>
                          {item.score}%
                        </strong>

                        <small>
                          Gap:{" "}
                          {item.gap}%
                        </small>
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            "/training",
                            {
                              state: {
                                skill:
                                  item.skill,
                                level:
                                  item.level,
                                percentage:
                                  item.score,
                                gap:
                                  item.gap,
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