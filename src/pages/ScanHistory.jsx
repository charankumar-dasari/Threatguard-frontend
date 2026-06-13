import { useEffect, useState } from "react";
import { getScanHistory } from "../services/scanService";

function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getScanHistory();
      setHistory(data);
    } catch (error) {
      console.error("History Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter((scan) => {
    const matchesSearch = scan.scannedUrl
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "MALICIOUS" && scan.malicious) ||
      (filterStatus === "SAFE" && !scan.malicious);

    return matchesSearch && matchesStatus;
  });

  const downloadCSV = () => {
    if (filteredHistory.length === 0) {
      alert("No data available to export");
      return;
    }

    const headers = [
      "ID",
      "URL",
      "Threat Score",
      "Status",
      "Message",
      "Scanned At",
    ];

    const rows = filteredHistory.map((scan) => [
      scan.scanId,
      scan.scannedUrl,
      scan.threatScore,
      scan.malicious ? "Malicious" : "Safe",
      scan.resultMessage,
      scan.scannedAt,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "threatguard-scan-history.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-card">
      <h2>Scan History</h2>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Search URL..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="MALICIOUS">Malicious</option>
          <option value="SAFE">Safe</option>
        </select>

        <button type="button" onClick={downloadCSV}>
          Export CSV
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredHistory.length === 0 ? (
        <p>No matching scan history found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
              <th>Threat Score</th>
              <th>Status</th>
              <th>Scanned At</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.map((scan) => (
              <tr key={scan.scanId}>
                <td>{scan.scanId}</td>
                <td>{scan.scannedUrl}</td>
                <td>{scan.threatScore}</td>
                <td>
                  <span className={scan.malicious ? "status-danger" : "status-safe"}>
                    {scan.malicious ? "Malicious" : "Safe"}
                  </span>
                </td>
                <td>{scan.scannedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ScanHistory;