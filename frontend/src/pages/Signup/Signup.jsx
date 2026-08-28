import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // const generateUserId = (role) => {
  //   const prefix = role === "faculty" ? "FAC" : "STU";

  //   const randomNumber = Math.floor(
  //     100000 + Math.random() * 900000
  //   );

  //   return `${prefix}${randomNumber}`;
  // };

    const handleSignup = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();

    // Validation
    if (!fullName) {
        setError("Please enter your full name.");
        return;
    }

    if (!email) {
        setError("Please enter your email address.");
        return;
    }

    if (formData.password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    try {
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          name: fullName,
          email,
          password: formData.password,
          role: formData.role,
        }),
      }
    );

      const data = await response.json();

      if (!response.ok) {
      setError(data.message || "Registration failed.");
      return;
      }

      setSuccess(
        data.message || "Account created successfully!"
      );

      if (!data.user) {
        setError("User information was not returned.");
        return;
      }

      switch (data.user.role) {
        case "faculty":
          navigate("/faculty-dashboard", {
            replace: true,
          });
          break;

        case "admin":
          navigate("/admin-dashboard", {
            replace: true,
          });
          break;

        case "student":
        default:
          navigate("/student-dashboard", {
            replace: true,
          });
          break;
      }

    } catch (error) {
        console.error("Signup error:", error);
        setError("Unable to connect to the server.");
    }
    };

  return (
    <div className="signup-page">

      {/* =========================
          LEFT SECTION
         ========================= */}

      <section className="signup-left">

        <div className="signup-brand">
          <div className="signup-logo">
            S
          </div>

          <div>
            <h1>StatLearn AI</h1>
            <p>AI-Powered Learning Platform</p>
          </div>
        </div>

        <div className="signup-hero">

          <p className="signup-small-title">
            START YOUR JOURNEY
          </p>

          <h2>
            Build Skills.
            <br />
            <span>Shape Your Future.</span>
          </h2>

          <p>
            Join StatLearn AI and discover personalized
            training designed around your competency needs.
          </p>

        </div>

        <div className="signup-benefits">

          <div>
            <span>01</span>
            <p>Identify your competency gaps</p>
          </div>

          <div>
            <span>02</span>
            <p>Get personalized training</p>
          </div>

          <div>
            <span>03</span>
            <p>Improve through adaptive learning</p>
          </div>

        </div>

      </section>


      {/* =========================
          RIGHT SECTION
         ========================= */}

      <section className="signup-right">

        <div className="signup-card">

          <div className="signup-header">
            <h2>Create Account</h2>

            <p>
              Create your StatLearn AI learning account
            </p>
          </div>


          <form onSubmit={handleSignup}>

            {/* FULL NAME */}

            <div className="signup-form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="signup-form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

            </div>


            {/* ROLE */}

            <div className="signup-form-group">

              <label>Account Type</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >

                <option value="student">
                  Student
                </option>

                <option value="faculty">
                  Faculty
                </option>

              </select>

            </div>


            {/* PASSWORDS */}

            <div className="signup-two-columns">

              <div className="signup-form-group">

                <label>Password</label>

                <div className="signup-password">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              <div className="signup-form-group">

                <label>
                  Confirm Password
                </label>

                <div className="signup-password">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

            </div>


            {/* TERMS */}

            <div className="signup-terms">

              <input
                type="checkbox"
                required
              />

              <p>
                I agree to the StatLearn AI
                <span>Terms of Use</span>
                and
                <span>Privacy Policy</span>
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="signup-error">

                ⚠

                <span>
                  {error}
                </span>

              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="signup-success">

                ✓

                <span>
                  {success}
                </span>

              </div>
            )}


            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="create-account-button"
            >

              Create Account

              <span>→</span>

            </button>

          </form>


          {/* LOGIN */}

          <div className="login-link-section">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >
              Sign In
            </button>

          </div>


          <div className="signup-security">
            Your information is securely protected
          </div>

        </div>

      </section>

    </div>
  );
}

export default Signup;