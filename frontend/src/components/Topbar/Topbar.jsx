import React from "react";
import "./Topbar.css";

export default function Topbar({ user }) {
  const displayName =
    user?.name ||
    user?.fullName ||
    "Student";

  const role =
    user?.role === "faculty"
      ? "Faculty"
      : user?.role === "admin"
      ? "Admin"
      : "Student";

  const initial = displayName
    .charAt(0)
    .toUpperCase();

  return (
    <header className="topbar">

      <div className="topbar-left">
        <h1>Student Dashboard</h1>

        <p>
          Track your learning and competency development
        </p>
      </div>

      <div className="topbar-right">

        <button
          type="button"
          className="notification-button"
        >
          🔔
        </button>

        <div className="topbar-avatar">
          {initial}
        </div>

        <div className="topbar-user">
          <strong>
            {displayName}
          </strong>

          <span>
            {role}
          </span>
        </div>

      </div>

    </header>
  );
}