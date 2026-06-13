import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getLoggedInUser } from "../services/authService";
import { getDashboardStats } from "../services/scanService";

function Dashboard() {
  const user = getLoggedInUser();

  const [stats, setStats] = useState({
    totalScans: 0,
    maliciousScans: 0,
    safeScans: 0,
    threatRate: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Dashboard stats error:", error);
    }
  };

  return (
    <div className="page-card">
      <h2>Welcome, {user?.fullName}</h2>

      <p>
        Welcome to ThreatGuard - Intelligent URL Threat Detection System.
      </p>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Scans</h3>
          <p className="big-number">{stats.totalScans}</p>
        </div>

        <div className="stat-card">
          <h3>Malicious Scans</h3>
          <p className="big-number danger">{stats.maliciousScans}</p>
        </div>

        <div className="stat-card">
          <h3>Safe Scans</h3>
          <p className="big-number safe">{stats.safeScans}</p>
        </div>

        <div className="stat-card">
          <h3>Threat Rate</h3>
          <p className="big-number">{stats.threatRate}%</p>
        </div>

        <div className="stat-card">
          <h3>URL Scanner</h3>
          <p>Scan suspicious URLs and check threat score.</p>
          <Link to="/scan">Go to Scanner</Link>
        </div>

        <div className="stat-card">
          <h3>Scan History</h3>
          <p>View your previously scanned URLs.</p>
          <Link to="/history">View History</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;