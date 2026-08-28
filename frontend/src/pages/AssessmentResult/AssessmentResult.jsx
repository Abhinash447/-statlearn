import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "./AssessmentResult.css";

const API_URL = "http://localhost:5000/api/v1";

export default function AssessmentResult() {

  const navigate = useNavigate();

  const { assessmentId } = useParams();

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // FETCH RESULT
  // ==========================================

  useEffect(() => {

    const fetchAssessmentResult =
      async () => {

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

    if (assessmentId) {
      fetchAssessmentResult();
    }

  }, [assessmentId]);

  // ==========================================
  // LOADING
  // ==========================================

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

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <div className="result-page">

        <div className="result-card">

          <h2>
            Unable to Load Result
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/skill-selection")
            }
          >
            Take Assessment
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // NO RESULT
  // ==========================================

  if (!result) {

    return (
      <div className="result-page">

        <div className="result-card">

          <h2>
            No Result Found
          </h2>

          <button
            onClick={() =>
              navigate("/skill-selection")
            }
          >
            Take Assessment
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // RESULT DATA
  // ==========================================

  const {
    skill,
    level,
    score = 0,
    totalQuestions = 0,
    percentage = 0,
  } = result;

  // ==========================================
  // COMPETENCY STATUS
  // ==========================================

  let status;

  if (percentage >= 80) {
    status = "Strong";
  } else if (percentage >= 50) {
    status = "Needs Improvement";
  } else {
    status = "Critical Gap";
  }

  // ==========================================
  // MESSAGE
  // ==========================================

  const message =
    percentage >= 80
      ? "Excellent! You have strong competency in this skill."
      : percentage >= 50
      ? "Good progress. Targeted training can strengthen your competency."
      : "A competency gap was identified. Personalized training is recommended.";

  // ==========================================
  // UI
  // ==========================================

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

        {/* SCORE */}

        <div className="score-circle">

          <strong>
            {percentage}%
          </strong>

          <span>
            {score} / {totalQuestions}
          </span>

        </div>

        {/* MESSAGE */}

        <h2>
          {percentage >= 60
            ? "Well Done!"
            : "Keep Learning!"}
        </h2>

        <p>
          {message}
        </p>

        {/* STATUS */}

        <div className="competency-status">

          <span>
            Competency Status
          </span>

          <strong>
            {status}
          </strong>

        </div>

        {/* SKILL GAP */}

        <button
          className="training-btn"
          onClick={() =>
            navigate("/skill-gaps")
          }
        >
          View Skill Gaps →
        </button>

        {/* TRAINING */}

        <button
          className="training-btn"
          onClick={() =>
            navigate("/training", {
              state: {
                skill,
                level,
                percentage,
                status,
              },
            })
          }
        >
          View Personalized Training →
        </button>

        {/* DASHBOARD */}

        <button
          className="dashboard-btn"
          onClick={() =>
            navigate("/student-dashboard")
          }
        >
          Dashboard
        </button>

      </div>

    </div>
  );
}