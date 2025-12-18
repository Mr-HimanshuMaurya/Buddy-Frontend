import { Navigate } from "react-router-dom";

export default function PgOwnerProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("userRole");

  if (isAuthenticated !== "true") {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "owner") {
    // Redirect to home if logged in but not an owner
    return <Navigate to="/" replace />;
  }

  return children;
}
