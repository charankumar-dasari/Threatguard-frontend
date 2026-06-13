import { useEffect, useState } from "react";
import { getAllUsers, getAllScans } from "../services/adminService";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [scans, setScans] = useState([]);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const usersData = await getAllUsers();
      const scansData = await getAllScans();

      setUsers(usersData);
      setScans(scansData);
    } catch (error) {
      console.error("Admin dashboard error:", error);
    }
  };

  return (
    <div className="page-card">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Scans</h3>
          <p>{scans.length}</p>
        </div>

        <div className="stat-card">
          <h3>Malicious Scans</h3>
          <p>{scans.filter((scan) => scan.malicious).length}</p>
        </div>
      </div>

      <h3 style={{ marginTop: "30px" }}>All Users</h3>

      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "30px" }}>All Scans</h3>

      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Score</th>
            <th>Status</th>
            <th>User Email</th>
          </tr>
        </thead>

        <tbody>
          {scans.map((scan) => (
            <tr key={scan.scanId}>
              <td>{scan.scanId}</td>
              <td>{scan.scannedUrl}</td>
              <td>{scan.threatScore}</td>
              <td>{scan.malicious ? "Malicious" : "Safe"}</td>
              <td>{scan.userEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;