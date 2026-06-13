import API from "../api/axiosConfig";

export const scanUrl = async (url) => {
  const response = await API.post("/scans", { url });
  return response.data;
};

export const getScanHistory = async () => {
  const response = await API.get("/scans/history");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await API.get("/scans/stats");
  return response.data;
};