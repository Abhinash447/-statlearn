import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TrainingModule.css";

const API_URL = "http://localhost:5000/api/v1";

export default function TrainingModule() {
  const navigate = useNavigate();
  const location = useLocation();

  const trainingId =
    location.state?.trainingId ||
    location.state?.training?._id;

  const [training, setTraining] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!trainingId) {
      navigate("/training", {
        replace: true,
      });
      return;
    }

    const loadTraining = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/training/${trainingId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load training material."
          );
        }

        setTraining(data.material);

        const startResponse = await fetch(
          `${API_URL}/training/${trainingId}/start`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const startData =
          await startResponse.json();

        if (!startResponse.ok) {
          throw new Error(
            startData.message ||
              "Failed to start training."
          );
        }

        setProgress(
          startData.progress?.progress || 0
        );
      } catch (err) {
        console.error(
          "Training module error:",
          err
        );

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTraining();
  }, [trainingId, navigate]);

  const updateProgress = async (value) => {
    try {
      const response = await fetch(
        `${API_URL}/training/${trainingId}/progress`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            progress: value,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update progress."
        );
      }

      setProgress(
        data.progress?.progress ?? value
      );

      return true;
    } catch (err) {
      console.error(
        "Progress update error:",
        err
      );

      alert(err.message);
      return false;
    }
  };

  const handleComplete = async () => {
    try {
      setCompleting(true);

      const response = await fetch(
        `${API_URL}/training/${trainingId}/complete`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to complete training."
        );
      }

      setProgress(100);

      navigate("/training", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Complete training error:",
        err
      );

      alert(err.message);
    } finally {
      setCompleting(false);
    }
  };

  const handleStartLearning = async () => {
    const success = await updateProgress(
      Math.max(progress, 25)
    );

    if (!success) {
      return;
    }
  };

  if (loading) {
    return (
      <div className="training-module-page">
        <div className="training-module-shell">
          <div className="lesson-card">
            <h2>
              Loading training material...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="training-module-page">
        <div className="training-module-shell">
          <div className="lesson-card">
            <h2>
              Unable to load training
            </h2>

            <p>{error}</p>

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/training")
              }
            >
              ← Back to Training
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!training) {
    return null;
  }

  return (
    <div className="training-module-page">
      <div className="training-module-shell">
        <button
          className="module-back"
          onClick={() =>
            navigate("/training")
          }
        >
          ← Back to Training
        </button>

        <section className="module-header">
          <div>
            <p className="module-eyebrow">
              TRAINING MODULE
            </p>

            <h1>
              {training.title}
            </h1>

            <p>
              {training.description}
            </p>
          </div>

          <div className="module-progress">
            <strong>
              {progress}%
            </strong>

            <span>
              Progress
            </span>
          </div>
        </section>

        <div className="training-info">
          <span>
            Skill: {training.skill}
          </span>

          <span>
            Level: {training.level}
          </span>

          <span>
            Competency: {training.competency}
          </span>

          <span>
            Duration: {training.duration} min
          </span>
        </div>

        <div className="progress-container">
          <div className="progress-label">
            <span>
              Training Progress
            </span>

            <strong>
              {progress}%
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <main className="lesson-card">
          <h2>
            {training.title}
          </h2>

          <div className="lesson-content">
            {training.content}
          </div>

          {training.url && (
            <a
              href={training.url}
              target="_blank"
              rel="noreferrer"
              className="resource-link"
            >
              Open External Resource →
            </a>
          )}

          <div className="lesson-actions">
            {progress < 100 && (
              <button
                className="secondary-btn"
                onClick={handleStartLearning}
                disabled={progress >= 25}
              >
                {progress >= 25
                  ? "Learning Started"
                  : "Start Learning"}
              </button>
            )}

            <button
              className="primary-btn"
              onClick={handleComplete}
              disabled={
                completing ||
                progress < 25
              }
            >
              {completing
                ? "Completing..."
                : progress >= 100
                ? "Completed ✓"
                : "Complete Training ✓"}
            </button>
          </div>

          {progress < 25 && (
            <p className="training-note">
              Start learning before completing
              the training module.
            </p>
          )}

          {progress >= 100 && (
            <p className="training-success">
              Training completed successfully.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}