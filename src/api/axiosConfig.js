import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Sending token:", token);
    console.log("Request headers:", config.headers);

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;