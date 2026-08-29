import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import "./AssessmentResult.css";

const API_URL =
  "http://localhost:5000/api/v1";

export default function AssessmentResult() {
  const navigate = useNavigate();
  const { assessmentId } =
    useParams();

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchResult = async () => {
      if (!assessmentId) {
        setError(
          "Assessment ID is missing."
        );
        setLoading(false);
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/assessments/${assessmentId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

        const data =
          await response.json();

        console.log(
          "Assessment Result:",
          data
        );

        if (
          response.status === 401
        ) {
          navigate("/login", {
            replace: true,
          });
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch assessment result."
          );
        }

        setResult(
          data.assessment
        );
      } catch (error) {
        console.error(
          "Assessment Result Error:",
          error
        );

        setError(
          error.message ||
            "Unable to load assessment result."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [
    assessmentId,
    navigate,
  ]);

  if (loading) {
    return (
      <div className="result-page">
        <div className="result-card">
          <h2>
            Loading Result...
          </h2>

          <p>
            Fetching your assessment result.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-page">
        <div className="result-card">
          <h2>
            Unable to Load Result
          </h2>

          <p>{error}</p>

          <button
            onClick={() =>
              navigate(
                "/skill-selection"
              )
            }
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-page">
        <div className="result-card">
          <h2>
            No Result Found
          </h2>

          <button
            onClick={() =>
              navigate(
                "/skill-selection"
              )
            }
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const {
    skill,
    level,
    score = 0,
    totalQuestions = 0,
    percentage = 0,
  } = result;

  const status =
    percentage >= 80
      ? "Strong"
      : percentage >= 50
      ? "Needs Improvement"
      : "Critical Gap";

  const message =
    percentage >= 80
      ? "Excellent! You have strong competency in this skill."
      : percentage >= 50
      ? "Good progress. Targeted training can strengthen your competency."
      : "A competency gap was identified. Personalized training is recommended.";

  return (
    <div className="result-page">
      <div className="result-card">
        <p className="result-label">
          ASSESSMENT COMPLETE
        </p>

        <h1>
          {skill} Assessment
        </h1>

        <p>
          {level} Level
        </p>

        <div className="score-circle">
          <strong>
            {percentage}%
          </strong>

          <span>
            {score} /{" "}
            {totalQuestions}
          </span>
        </div>

        <h2>
          {percentage >= 60
            ? "Well Done!"
            : "Keep Learning!"}
        </h2>

        <p>{message}</p>

        <div className="competency-status">
          <span>
            Competency Status
          </span>

          <strong>
            {status}
          </strong>
        </div>

        <button
          className="training-btn"
          onClick={() =>
            navigate(
              "/skill-gaps"
            )
          }
        >
          View Skill Gaps →
        </button>

        <button
          className="training-btn"
          onClick={() =>
            navigate(
              "/training",
              {
                state: {
                  skill,
                  level,
                  percentage,
                  status,
                },
              }
            )
          }
        >
          View Personalized Training →
        </button>

        <button
          className="dashboard-btn"
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
  );
}