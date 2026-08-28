import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Training.css";

const API_URL = "http://localhost:5000/api/v1";

export default function Training() {
  const navigate = useNavigate();
  const location = useLocation();

  const [recommendations, setRecommendations] = useState([]);
  const [progressData, setProgressData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSkill, setSelectedSkill] = useState(
    location.state?.skill || ""
  );

  const [selectedLevel, setSelectedLevel] = useState(
    location.state?.level || ""
  );

  // =====================================================
  // LOAD TRAINING DATA
  // =====================================================

  useEffect(() => {
    loadTraining();
  }, []);

  const loadTraining = async () => {
    try {
      setLoading(true);
      setError("");

      const [recommendationResponse, progressResponse] =
        await Promise.all([
          fetch(
            `${API_URL}/training/recommended`,
            {
              method: "GET",
              credentials: "include",
            }
          ),

          fetch(
            `${API_URL}/training/progress/my`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

      const recommendationData =
        await recommendationResponse.json();

      const progressResult =
        await progressResponse.json();

      console.log(
        "Training recommendations:",
        recommendationData
      );

      console.log(
        "Training progress:",
        progressResult
      );

      if (
        !recommendationResponse.ok
      ) {
        if (
          recommendationResponse.status === 401
        ) {
          navigate("/login", {
            replace: true,
          });

          return;
        }

        throw new Error(
          recommendationData.message ||
            "Failed to load training."
        );
      }

      setRecommendations(
        recommendationData.recommendations ||
          []
      );

      setProgressData(
        progressResult.progress ||
          []
      );

    } catch (error) {
      console.error(
        "Training loading error:",
        error
      );

      setError(
        error.message ||
          "Failed to load training."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // START TRAINING
  // =====================================================

  const startTraining = async (
    trainingId
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/training/${trainingId}/start`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const data =
        await response.json();

      console.log(
        "Start training:",
        data
      );

      if (!response.ok) {

        if (
          response.status === 401
        ) {
          navigate("/login", {
            replace: true,
          });

          return;
        }

        throw new Error(
          data.message ||
            "Unable to start training."
        );
      }

      // Update progress locally
      setProgressData((previous) => {

        const exists =
          previous.find(
            (item) =>
              String(
                item.trainingMaterial?._id ||
                  item.trainingMaterial
              ) ===
              String(trainingId)
          );

        if (exists) {
          return previous.map(
            (item) =>
              String(
                item.trainingMaterial?._id ||
                  item.trainingMaterial
              ) ===
              String(trainingId)
                ? data.progress
                : item
          );
        }

        return [
          data.progress,
          ...previous,
        ];
      });

      // Open training module
      navigate(
        "/training/module",
        {
          state: {
            trainingId,
          },
        }
      );

    } catch (error) {
      console.error(
        "Start training error:",
        error
      );

      alert(
        error.message ||
          "Unable to start training."
      );
    }
  };


  // =====================================================
  // COMPLETE TRAINING
  // =====================================================

  const completeTraining = async (
    trainingId
  ) => {
    try {

      const response = await fetch(
        `${API_URL}/training/${trainingId}/complete`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      const data =
        await response.json();

      console.log(
        "Complete training:",
        data
      );

      if (!response.ok) {

        if (
          response.status === 401
        ) {
          navigate("/login", {
            replace: true,
          });

          return;
        }

        throw new Error(
          data.message ||
            "Unable to complete training."
        );
      }

      setProgressData(
        (previous) =>
          previous.map(
            (item) =>
              String(
                item.trainingMaterial?._id ||
                  item.trainingMaterial
              ) ===
              String(trainingId)
                ? data.progress
                : item
          )
      );

    } catch (error) {

      console.error(
        "Complete training error:",
        error
      );

      alert(
        error.message ||
          "Unable to complete training."
      );
    }
  };


  // =====================================================
  // GET PROGRESS FOR MATERIAL
  // =====================================================

  const getProgress = (
    trainingId
  ) => {

    const item =
      progressData.find(
        (progress) =>
          String(
            progress.trainingMaterial?._id ||
              progress.trainingMaterial
          ) ===
          String(trainingId)
      );

    return item || null;
  };


  // =====================================================
  // FILTER TRAINING
  // =====================================================

  const filteredRecommendations =
    recommendations.filter(
      (training) => {

        if (
          selectedSkill &&
          training.skill !== selectedSkill
        ) {
          return false;
        }

        if (
          selectedLevel &&
          training.level !== selectedLevel
        ) {
          return false;
        }

        return true;
      }
    );


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="training-page">
        <div className="training-shell">

          <div className="training-loading">

            <h2>
              Loading Personalized Training...
            </h2>

            <p>
              Analyzing your competency gaps
              and finding suitable learning
              resources.
            </p>

          </div>

        </div>
      </div>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="training-page">
        <div className="training-shell">

          <button
            className="training-back"
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
          >
            ← Dashboard
          </button>

          <div className="ai-panel">

            <h3>
              Unable to load training
            </h3>

            <p>
              {error}
            </p>

            <button
              className="quiz-cta"
              onClick={loadTraining}
            >
              Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }


  // =====================================================
  // NO RECOMMENDATIONS
  // =====================================================

  if (
    !recommendations.length
  ) {
    return (
      <div className="training-page">
        <div className="training-shell">

          <button
            className="training-back"
            onClick={() =>
              navigate(
                "/student-dashboard"
              )
            }
          >
            ← Dashboard
          </button>

          <section className="training-hero">

            <div>

              <p className="eyebrow">
                PERSONALIZED LEARNING
              </p>

              <h1>
                Your Learning Plan
              </h1>

              <p>
                No personalized training
                recommendations are available
                yet.
              </p>

            </div>

          </section>

          <div className="ai-panel">

            <h3>
              Complete a Skill Assessment
            </h3>

            <p>
              Complete a skill assessment so
              StatLearn can identify your
              competency gaps and recommend
              relevant training.
            </p>

            <button
              className="quiz-cta"
              onClick={() =>
                navigate(
                  "/skill-selection"
                )
              }
            >
              Take Skill Assessment →
            </button>

          </div>

        </div>
      </div>
    );
  }


  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <div className="training-page">

      <div className="training-shell">

        {/* =========================================
            BACK
        ========================================= */}

        <button
          className="training-back"
          onClick={() =>
            navigate(
              "/student-dashboard"
            )
          }
        >
          ← Dashboard
        </button>


        {/* =========================================
            HERO
        ========================================= */}

        <section className="training-hero">

          <div>

            <p className="eyebrow">
              PERSONALIZED LEARNING PATH
            </p>

            <h1>
              Recommended Training
            </h1>

            <p>
              Training recommendations are
              based on your latest competency
              assessment.
            </p>

          </div>

          <div className="gap-score">

            <span>
              {filteredRecommendations.length}
            </span>

            <small>
              Recommended Modules
            </small>

          </div>

        </section>


        {/* =========================================
            FILTERS
        ========================================= */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >

          <button
            className="quiz-cta secondary"
            onClick={() => {
              setSelectedSkill("");
              setSelectedLevel("");
            }}
          >
            All Training
          </button>

          {[
            ...new Set(
              recommendations.map(
                (item) => item.skill
              )
            ),
          ].map((skill) => (
            <button
              key={skill}
              className="quiz-cta secondary"
              onClick={() => {
                setSelectedSkill(skill);
                setSelectedLevel("");
              }}
            >
              {skill}
            </button>
          ))}

        </div>


        {/* =========================================
            TRAINING GRID
        ========================================= */}

        <div className="training-grid">

          <main className="training-main">

            {filteredRecommendations.map(
              (training, index) => {

                const progress =
                  getProgress(
                    training._id
                  );

                const isStarted =
                  progress?.status ===
                  "in-progress";

                const isCompleted =
                  progress?.status ===
                  "completed";

                const progressValue =
                  progress?.progress || 0;

                return (
                  <article
                    className="course-card"
                    key={training._id}
                  >

                    <div className="course-number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>


                    <div className="course-content">

                      {/* META */}

                      <div className="course-meta">

                        <span>
                          {training.level}
                        </span>

                        <span>
                          {training.duration
                            ? `${training.duration} min`
                            : "Training"}
                        </span>

                        <span>
                          Recommended
                        </span>

                      </div>


                      {/* TITLE */}

                      <h2>
                        {training.title}
                      </h2>


                      {/* DESCRIPTION */}

                      <p>
                        {training.description}
                      </p>


                      {/* COMPETENCY */}

                      {training.competency && (
                        <p>
                          <strong>
                            Competency:
                          </strong>{" "}
                          {training.competency}
                        </p>
                      )}


                      {/* PROGRESS */}

                      {progress && (
                        <div
                          style={{
                            margin:
                              "15px 0",
                          }}
                        >

                          <div
                            style={{
                              display:
                                "flex",
                              justifyContent:
                                "space-between",
                              fontSize:
                                "13px",
                              marginBottom:
                                "6px",
                            }}
                          >

                            <span>
                              Training Progress
                            </span>

                            <strong>
                              {progressValue}%
                            </strong>

                          </div>

                          <div
                            style={{
                              height:
                                "8px",
                              background:
                                "#e5e9f1",
                              borderRadius:
                                "10px",
                              overflow:
                                "hidden",
                            }}
                          >

                            <div
                              style={{
                                width:
                                  `${progressValue}%`,
                                height:
                                  "100%",
                                background:
                                  "#5969e8",
                                borderRadius:
                                  "10px",
                              }}
                            />

                          </div>

                        </div>
                      )}


                      {/* RECOMMENDATION REASON */}

                      {training.recommendationReason && (
                        <div className="ai-panel">

                          <p>
                            <strong>
                              Why recommended?
                            </strong>
                          </p>

                          <p>
                            {
                              training.recommendationReason
                            }
                          </p>

                        </div>
                      )}


                      {/* ACTIONS */}

                      <div className="course-actions">

                        <button
                          disabled={
                            isCompleted
                          }
                          onClick={() =>
                            startTraining(
                              training._id
                            )
                          }
                        >
                          {isCompleted
                            ? "Completed"
                            : isStarted
                            ? "Continue Training"
                            : "Start Training"}
                        </button>


                        <button
                          disabled={
                            !isStarted ||
                            isCompleted
                          }
                          onClick={() =>
                            completeTraining(
                              training._id
                            )
                          }
                        >
                          {isCompleted
                            ? "Completed"
                            : "Mark Complete"}
                        </button>


                        <span>
                          {isCompleted
                            ? "Training completed and saved."
                            : isStarted
                            ? "Training in progress."
                            : "Start the module to begin."}
                        </span>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </main>


          {/* =========================================
              SIDE PANEL
          ========================================= */}

          <aside className="training-side">

            <div className="ai-panel">

              <div className="ai-badge">
                AI
              </div>

              <h3>
                Personalized Training
              </h3>

              <p>
                These learning resources are
                selected based on your latest
                competency assessment.
              </p>

              <div className="mini-stat">

                <span>
                  Recommended modules
                </span>

                <strong>
                  {recommendations.length}
                </strong>

              </div>

              <div className="mini-stat">

                <span>
                  Completed
                </span>

                <strong>
                  {
                    progressData.filter(
                      (item) =>
                        item.status ===
                        "completed"
                    ).length
                  }
                </strong>

              </div>

            </div>


            {/* QUIZ */}

            <button
              className="quiz-cta"
              onClick={() =>
                navigate(
                  "/quiz",
                  {
                    state: {
                      skill:
                        selectedSkill ||
                        recommendations[0]
                          ?.skill,

                      level:
                        selectedLevel ||
                        recommendations[0]
                          ?.level ||
                        "Beginner",
                    },
                  }
                )
              }
            >
              Take AI Quiz →
            </button>


            {/* POST TRAINING */}

            <button
              className="quiz-cta secondary"
              onClick={() =>
                navigate(
                  "/assessment",
                  {
                    state: {
                      skill:
                        selectedSkill ||
                        recommendations[0]
                          ?.skill,

                      level:
                        selectedLevel ||
                        recommendations[0]
                          ?.level ||
                        "Beginner",

                      type:
                        "postTraining",
                    },
                  }
                )
              }
            >
              Post-Training Assessment →
            </button>


            {/* PROGRESS */}

            <button
              className="quiz-cta secondary"
              onClick={() =>
                navigate(
                  "/progress"
                )
              }
            >
              View My Progress →
            </button>

          </aside>

        </div>

      </div>

    </div>
  );
}