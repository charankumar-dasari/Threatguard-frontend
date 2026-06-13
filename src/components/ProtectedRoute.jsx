import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../services/authService";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const user = getLoggedInUser();

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;