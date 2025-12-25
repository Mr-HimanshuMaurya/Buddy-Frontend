import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("userRole");

  if (isAuthenticated !== "true") {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "admin") {
    // Redirect to home if logged in but not an admin
    return <Navigate to="/" replace />;
  }

  return children;
}

