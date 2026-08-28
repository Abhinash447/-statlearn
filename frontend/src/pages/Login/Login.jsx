import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ----------------------------------------
  // HANDLE INPUT CHANGE
  // ----------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ----------------------------------------
  // HANDLE LOGIN
  // ----------------------------------------

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    // ----------------------------------------
    // FRONTEND VALIDATION
    // ----------------------------------------

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // ----------------------------------------
      // LOGIN API REQUEST
      // ----------------------------------------

      const response = await fetch(
        "http://localhost:5000/api/v1/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Required for HTTP-only JWT cookie
          credentials: "include",

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // ----------------------------------------
      // HANDLE BACKEND ERROR
      // ----------------------------------------

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );

        return;
      }

      // ----------------------------------------
      // LOGIN SUCCESS
      // ----------------------------------------

      setSuccess("Account created successfully!");

      switch (data.user.role) {
        case "admin":
          navigate("/admin-dashboard", { replace: true });
          break;

        case "faculty":
          navigate("/faculty-dashboard", { replace: true });
          break;

        case "student":
        default:
          navigate("/student-dashboard", { replace: true });
          break;
      }

    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------
  // FORGOT PASSWORD
  // ----------------------------------------

  const handleForgotPassword = () => {
    setError(
      "Forgot password functionality will be added later."
    );
  };

  return (
    <div className="login-page">

      {/* =====================================
          LEFT SECTION
      ====================================== */}

      <section className="login-left">

        <div className="login-brand">

          <div className="login-logo">
            S
          </div>

          <div>
            <h1>StatLearn</h1>
            <p>AI-Powered Learning Platform</p>
          </div>

        </div>

        <div className="login-hero">

          <p className="welcome-small">
            WELCOME TO STATLEARN
          </p>

          <h2>
            Learn Smarter.
            <br />
            <span>Grow Stronger.</span>
          </h2>

          <p className="hero-description">
            Build your competencies with personalized
            learning paths, AI-powered assessments and
            adaptive training.
          </p>

        </div>

        <div className="login-features">

          <div className="feature-item">

            <div className="feature-icon">
              ✓
            </div>

            <div>
              <strong>
                Personalized Learning
              </strong>

              <p>
                Training based on your competency gaps
              </p>
            </div>

          </div>

          <div className="feature-item">

            <div className="feature-icon">
              AI
            </div>

            <div>
              <strong>
                AI-Powered Assessments
              </strong>

              <p>
                Intelligent quizzes and MCQs from
                learning materials
              </p>
            </div>

          </div>

          <div className="feature-item">

            <div className="feature-icon">
              ↗
            </div>

            <div>
              <strong>
                Track Your Growth
              </strong>

              <p>
                Monitor your competency development
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          RIGHT SECTION
      ====================================== */}

      <section className="login-right">

        <div className="login-card">

          <div className="login-mobile-logo">
            S
          </div>

          <div className="login-header">

            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to continue your learning journey
            </p>

          </div>


          {/* =====================================
              LOGIN FORM
          ====================================== */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="username"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <div className="password-label">

                <label>
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>

              </div>

              <div className="input-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>


            {/* REMEMBER ME */}

            <div className="remember-row">

              <label>

                <input
                  type="checkbox"
                  name="rememberMe"
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-error">

                <span>
                  {error}
                </span>

              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="signin-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </span>

              {!loading && (
                <span className="arrow">
                  →
                </span>
              )}

            </button>

          </form>


          {/* =====================================
              SIGNUP
          ====================================== */}

          <div className="signup-section">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/signup")
              }
            >
              Create Account
            </button>

          </div>


          <div className="security-message">
            Your information is securely protected
          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;