import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./FacultySidebar.css";

export default function FacultySidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/v1/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <aside className="faculty-sidebar">

      {/* Logo */}
      <div className="faculty-sidebar-logo">
        <div className="faculty-logo-box">S</div>

        <div>
          <h2>StatLearn</h2>
          <span>AI Learning Platform</span>
        </div>
      </div>

      {/* Section Title */}
      <div className="faculty-section-title">
        FACULTY
      </div>

      {/* Navigation */}
      <nav className="faculty-sidebar-nav">

        <NavLink
          to="/faculty-dashboard"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/faculty-students"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>♟</span>
          Students
        </NavLink>

        <NavLink
          to="/faculty-learning-resources"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>▣</span>
          Learning Resources
        </NavLink>

        <NavLink
          to="/training-management"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>▤</span>
          Training Management
        </NavLink>

        <NavLink
          to="/quiz-management"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>?</span>
          Quiz & MCQ Generator
        </NavLink>

        <NavLink
          to="/assessment-management"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>✓</span>
          Assessment Management
        </NavLink>

        <NavLink
          to="/performance-analytics"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>◉</span>
          Performance Analytics
        </NavLink>

        <NavLink
          to="/competency-gaps"
          className={({ isActive }) =>
            `faculty-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>◇</span>
          Competency Gaps
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="faculty-sidebar-bottom">

        <button
          type="button"
          className="faculty-bottom-button logout-button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}