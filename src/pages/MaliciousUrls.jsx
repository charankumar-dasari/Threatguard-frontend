import { useEffect, useState } from "react";
import {
  getAllMaliciousUrls,
  addMaliciousUrl,
  deleteMaliciousUrl,
} from "../services/adminService";

function MaliciousUrls() {
  const [urls, setUrls] = useState([]);
  const [formData, setFormData] = useState({
    url: "",
    threatType: "",
    description: "",
  });

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    const data = await getAllMaliciousUrls();
    setUrls(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    await addMaliciousUrl(formData);

    setFormData({
      url: "",
      threatType: "",
      description: "",
    });

    loadUrls();
  };

  const handleDelete = async (id) => {
    await deleteMaliciousUrl(id);
    loadUrls();
  };

  return (
    <div className="page-card">
      <h2>Manage Malicious URLs</h2>

      <form onSubmit={handleAdd}>
        <label>URL</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="http://malicious-site.com"
        />

        <label>Threat Type</label>
        <input
          type="text"
          name="threatType"
          value={formData.threatType}
          onChange={handleChange}
          placeholder="PHISHING / SCAM / MALWARE"
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Fake login page"
        />

        <button type="submit">Add Malicious URL</button>
      </form>

      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Threat Type</th>
            <th>Description</th>
            <th>Added At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.url}</td>
              <td>{item.threatType}</td>
              <td>{item.description}</td>
              <td>{item.addedAt}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaliciousUrls;