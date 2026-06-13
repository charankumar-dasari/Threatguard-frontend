import API from "../api/axiosConfig";

export const getAllUsers = async () => {
  const response = await API.get("/admin/users");
  return response.data;
};

export const getAllScans = async () => {
  const response = await API.get("/admin/scans");
  return response.data;
};

export const getAllMaliciousUrls = async () => {
  const response = await API.get("/admin/malicious-urls");
  return response.data;
};

export const addMaliciousUrl = async (data) => {
  const response = await API.post("/admin/malicious-urls", data);
  return response.data;
};

export const deleteMaliciousUrl = async (id) => {
  const response = await API.delete(`/admin/malicious-urls/${id}`);
  return response.data;
};