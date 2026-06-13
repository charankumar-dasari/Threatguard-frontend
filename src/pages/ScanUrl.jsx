import { useState } from "react";
import { scanUrl } from "../services/scanService";

function ScanUrl() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const getScoreClass = (score) => {
    if (score >= 75) {
      return "score-high";
    }

    if (score >= 50) {
      return "score-medium";
    }

    if (score >= 25) {
      return "score-low";
    }

    return "score-safe";
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const data = await scanUrl(url);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "URL scan failed"
      );
    }
  };

  return (
    <div className="page-card">
      <h2>URL Scanner</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleScan}>
        <label>Enter URL</label>
        <input
          type="text"
          value={url}
          placeholder="Example: http://fake-bank-login.com"
          onChange={(e) => setUrl(e.target.value)}
        />

        <button type="submit">Scan URL</button>
      </form>

      {result && (
        <div className="result-card">
          <h3>Scan Result</h3>

          <p>
            <b>URL:</b> {result.scannedUrl}
          </p>

          <p>
            <b>Threat Score:</b>{" "}
            <span className={getScoreClass(result.threatScore)}>
              {result.threatScore}/100
            </span>
          </p>

          <p>
            <b>Status:</b>{" "}
            <span className={result.malicious ? "status-danger" : "status-safe"}>
              {result.malicious ? "Malicious" : "Safe"}
            </span>
          </p>

          <p>
            <b>Message:</b> {result.resultMessage}
          </p>

          <p>
            <b>Scanned At:</b> {result.scannedAt}
          </p>
        </div>
      )}
    </div>
  );
}

export default ScanUrl;