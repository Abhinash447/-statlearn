import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/v1";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          `${API_URL}/dashboard`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log(
          "ProtectedRoute auth response:",
          data
        );

        if (!response.ok || !data.user) {
          setStatus("unauthorized");
          return;
        }

        setUser(data.user);
        setStatus("authenticated");

      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        );

        setStatus("unauthorized");
      }
    };

    checkAuthentication();
  }, []);

  // Don't redirect while checking authentication
  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  // Not authenticated
  if (status === "unauthorized") {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Check role
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === "faculty") {
      return (
        <Navigate
          to="/faculty-dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/student-dashboard"
        replace
      />
    );
  }

  return children;
}