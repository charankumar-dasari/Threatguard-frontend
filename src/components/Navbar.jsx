import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand">
        ThreatGuard
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/scan">Scan URL</Link>
            <Link to="/history">History</Link>

            {user.role === "ADMIN" && (
              <>
                <Link to="/admin">Admin</Link>
                <Link to="/malicious-urls">Malicious URLs</Link>
              </>
            )}

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;