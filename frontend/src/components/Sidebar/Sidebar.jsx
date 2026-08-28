import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const items = [
  ["⌂", "Dashboard", "/student-dashboard"],
  ["✓", "Skill Assessment", "/skill-selection"],
  ["◈", "Skill Gaps", "/skill-gaps"],
  ["▣", "My Training", "/training"],
  ["?", "AI Quiz & MCQs", "/quiz"],
  ["↗", "Assessments", "/assessment"],
  ["◉", "My Progress", "/progress"],
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("statlearnLoggedIn");
    localStorage.removeItem("statlearnCurrentUser");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">S</div>
        <div>
          <h2>StatLearn</h2>
          <span>AI Learning Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map(([icon, label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          className="nav-item nav-button"
          onClick={() =>
            alert("Settings are ready for backend integration.")
          }
        >
          <span>⚙</span>
          Settings
        </button>

        <button
          className="nav-item nav-button logout"
          onClick={logout}
        >
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}