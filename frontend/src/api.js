// frontend/src/api.js
import axios from "axios";
import { clearAuth } from "./utils/auth";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL:"https://recipe-gen-ud16.onrender.com/",
});

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired or invalid JWT globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      toast.error("Session expired. Please login again.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
