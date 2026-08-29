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
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);
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

        const material = data.material;

        setTraining(material);

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

        const savedProgress =
          Number(
            startData.progress?.progress || 0
          );

        setProgress(savedProgress);

        const totalLessons =
          material.lessons?.length || 0;

        if (totalLessons > 0) {
          const savedLesson = Math.min(
            Math.floor(
              (savedProgress / 100) *
                totalLessons
            ),
            totalLessons - 1
          );

          setCurrentLesson(
            savedProgress >= 100
              ? totalLessons - 1
              : savedLesson
          );
        }
      } catch (err) {
        console.error(
          "Training module error:",
          err
        );

        setError(
          err.message ||
            "Unable to load training."
        );
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

      const updatedProgress =
        Number(
          data.progress?.progress ?? value
        );

      setProgress(updatedProgress);

      window.dispatchEvent(
        new Event("statlearn:data-changed")
      );

      return true;
    } catch (err) {
      console.error(
        "Progress update error:",
        err
      );

      setError(
        err.message ||
          "Failed to update progress."
      );

      return false;
    }
  };

  const handleNext = async () => {
    if (
      !training?.lessons?.length ||
      completing
    ) {
      return;
    }

    const totalLessons =
      training.lessons.length;

    const nextLesson =
      currentLesson + 1;

    if (nextLesson >= totalLessons) {
      await handleComplete();
      return;
    }

    const calculatedProgress =
      Math.round(
        ((nextLesson + 1) /
          totalLessons) *
          100
      );

    const success =
      await updateProgress(
        Math.min(
          calculatedProgress,
          99
        )
      );

    if (success) {
      setCurrentLesson(
        nextLesson
      );
    }
  };

  const handlePrevious = () => {
    if (currentLesson === 0) {
      return;
    }

    const previousLesson =
      currentLesson - 1;

    setCurrentLesson(
      previousLesson
    );
  };

  const handleComplete = async () => {
    if (completing) {
      return;
    }

    try {
      setCompleting(true);
      setError("");

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

      window.dispatchEvent(
        new Event("statlearn:data-changed")
      );

      navigate("/training", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Complete training error:",
        err
      );

      setError(
        err.message ||
          "Failed to complete training."
      );
    } finally {
      setCompleting(false);
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

  if (error && !training) {
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

  const lessons =
    training.lessons || [];

  const totalLessons =
    lessons.length;

  const lesson =
    lessons[currentLesson];

  const isLastLesson =
    currentLesson ===
    totalLessons - 1;

  const lessonProgress =
    totalLessons > 0
      ? Math.round(
          ((currentLesson + 1) /
            totalLessons) *
            100
        )
      : 0;

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
          <div className="module-header-content">
            <p className="module-eyebrow">
              PERSONALIZED TRAINING
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
              Overall Progress
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

        {totalLessons > 0 ? (
          <>
            <div className="progress-container">
              <div
                className="progress-label"
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: "20px",
                  width: "100%",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
              >
                <span>
                  Lesson{" "}
                  {currentLesson + 1}{" "}
                  of {totalLessons}
                </span>

                <strong>
                  {lessonProgress}%
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${lessonProgress}%`,
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="training-error">
                {error}
              </div>
            )}

            <main className="lesson-card">
              <p className="lesson-number">
                Lesson {currentLesson + 1}
              </p>

              <h2>
                {lesson.title}
              </h2>

              {lesson.content && (
                <div className="lesson-section">
                  <h3>
                    Explanation
                  </h3>

                  <div className="lesson-content">
                    {lesson.content}
                  </div>
                </div>
              )}

              {lesson.example && (
                <div className="lesson-section">
                  <h3>
                    Example
                  </h3>

                  <div className="lesson-example">
                    <pre>
                      {lesson.example}
                    </pre>
                  </div>
                </div>
              )}

              {lesson.keyPoints?.length >
                0 && (
                <div className="lesson-section">
                  <h3>
                    Key Points
                  </h3>

                  <ul>
                    {lesson.keyPoints.map(
                      (
                        point,
                        index
                      ) => (
                        <li
                          key={index}
                        >
                          {point}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {lesson.practice && (
                <div className="lesson-section">
                  <h3>
                    Practice
                  </h3>

                  <div className="lesson-practice">
                    {lesson.practice}
                  </div>
                </div>
              )}

              <div className="lesson-actions">
                <button
                  className="secondary-btn"
                  onClick={
                    handlePrevious
                  }
                  disabled={
                    currentLesson ===
                      0 ||
                    completing
                  }
                >
                  ← Previous
                </button>

                <button
                  className="primary-btn"
                  onClick={
                    handleNext
                  }
                  disabled={
                    completing
                  }
                >
                  {completing
                    ? "Completing..."
                    : isLastLesson
                    ? "Complete Training ✓"
                    : "Next Lesson →"}
                </button>
              </div>

              {isLastLesson && (
                <p className="training-note">
                  You have reached the
                  final lesson. Complete
                  the training to save
                  100% progress.
                </p>
              )}
            </main>
          </>
        ) : (
          <main className="lesson-card">
            <h2>
              Training Content Coming Soon
            </h2>

            <p>
              This training material does
              not contain lessons yet.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/training")
              }
            >
              ← Back to Training
            </button>
          </main>
        )}
      </div>  
    </div>
  );
}