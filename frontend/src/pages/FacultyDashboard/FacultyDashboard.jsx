import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FacultySidebar from "../../components/FacultySidebar/FacultySidebar";

import "./FacultyDashboard.css";

// ==========================================
// TEMPORARY ACTIVITY DATA
// Later this will come from the backend
// ==========================================

const activity = [
  [
    "AR",
    "Ananya Rao",
    "Completed Java Skill Assessment",
    "86%",
  ],
  [
    "VK",
    "Vikram Kumar",
    "Completed SQL Training",
    "92%",
  ],
  [
    "SM",
    "Sanjay Menon",
    "Needs support in Data Visualization",
    "54%",
  ],
  [
    "PN",
    "Priya Nair",
    "Completed AI Quiz",
    "88%",
  ],
];

export default function FacultyDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH FACULTY DASHBOARD
  // ==========================================

  useEffect(() => {
    const fetchFacultyDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/dashboard",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log(
          "Faculty Dashboard API:",
          data
        );

        // ======================================
        // API ERROR
        // ======================================

        if (!response.ok) {
          console.error(
            "Dashboard API error:",
            data
          );

          navigate("/login", {
            replace: true,
          });

          return;
        }

        // ======================================
        // USER NOT FOUND
        // ======================================

        if (!data.user) {
          console.error(
            "No user returned from dashboard API"
          );

          navigate("/login", {
            replace: true,
          });

          return;
        }

        // ======================================
        // ROLE CHECK
        // ======================================

        if (data.user.role !== "faculty") {
          console.warn(
            "Unauthorized role:",
            data.user.role
          );

          if (data.user.role === "student") {
            navigate("/student-dashboard", {
              replace: true,
            });
          } else {
            navigate("/login", {
              replace: true,
            });
          }

          return;
        }

        // ======================================
        // SET FACULTY USER
        // ======================================

        setUser(data.user);

      } catch (error) {
        console.error(
          "Faculty dashboard error:",
          error
        );

        navigate("/login", {
          replace: true,
        });

      } finally {
        setLoading(false);
      }
    };

    fetchFacultyDashboard();
  }, [navigate]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="faculty-loading">
        Loading Faculty Dashboard...
      </div>
    );
  }


  // ==========================================
  // NO USER
  // ==========================================

  if (!user) {
    return null;
  }


  // ==========================================
  // DASHBOARD UI
  // ==========================================

  return (
    <div className="fa-page">

      {/* =====================================
          FACULTY SIDEBAR
      ===================================== */}

      <FacultySidebar />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="fa-content">


        {/* ===================================
            HEADER
        =================================== */}

        <header className="fa-header">

          <div className="fa-brand">

            <div>
              S
            </div>

            StatLearn

          </div>


          <div className="fa-user">

            <strong>
              {user?.name || "Faculty"}
            </strong>

            <small>
              Faculty
            </small>

          </div>

        </header>


        {/* ===================================
            MAIN
        =================================== */}

        <main className="fa-main">


          {/* =================================
              INTRO
          ================================= */}

          <div className="fa-intro">

            <div>

              <p className="eyebrow">
                FACULTY ANALYTICS
              </p>

              <h1>
                Learning Overview
              </h1>

              <p>
                Monitor competency development
                and identify students who need
                support.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                navigate("/student-dashboard")
              }
            >
              Student View
            </button>

          </div>


          {/* =================================
              STATISTICS
          ================================= */}

          <div className="fa-stats">


            {/* STUDENTS */}

            <div>

              <span>
                Students
              </span>

              <strong>
                128
              </strong>

              <small>
                +12 this month
              </small>

            </div>


            {/* ASSESSMENTS */}

            <div>

              <span>
                Assessments
              </span>

              <strong>
                342
              </strong>

              <small>
                Completed
              </small>

            </div>


            {/* COMPETENCY */}

            <div>

              <span>
                Avg Competency
              </span>

              <strong>
                74%
              </strong>

              <small>
                ↑ 6%
              </small>

            </div>


            {/* TRAINING */}

            <div>

              <span>
                Training Completion
              </span>

              <strong>
                81%
              </strong>

              <small>
                Strong progress
              </small>

            </div>

          </div>


          {/* =================================
              LOWER GRID
          ================================= */}

          <div className="fa-grid">


            {/* =================================
                QUICK ACTIONS
            ================================= */}

            <section className="fa-panel">

              <h2>
                Quick Actions
              </h2>


              <button
                type="button"
                onClick={() =>
                  navigate("/assessment-management")
                }
              >
                View Skill Assessments
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate("/competency-gaps")
                }
              >
                Review Skill Gaps
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate("/training-management")
                }
              >
                Manage Training Paths
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate("/performance-analytics")
                }
              >
                View Progress
              </button>

            </section>


            {/* =================================
                RECENT ACTIVITY
            ================================= */}

            <section className="fa-panel">

              <div className="panel-head">

                <div>

                  <h2>
                    Recent Activity
                  </h2>

                  <p>
                    Latest learner events
                  </p>

                </div>


                <span>
                  LIVE
                </span>

              </div>


              {activity.map((item) => (

                <div
                  className="activity"
                  key={item[1]}
                >

                  {/* Avatar */}

                  <div className="activity-avatar">
                    {item[0]}
                  </div>


                  {/* Activity */}

                  <div>

                    <strong>
                      {item[1]}
                    </strong>

                    <p>
                      {item[2]}
                    </p>

                  </div>


                  {/* Score */}

                  <b>
                    {item[3]}
                  </b>

                </div>

              ))}

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}