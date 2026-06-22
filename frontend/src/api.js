import axios from "axios";

// In development, Vite reads from .env (VITE_API_URL=http://localhost:5000/api/jobs)
// In production (Vercel), set VITE_API_URL to your deployed Render backend URL,
// e.g. https://your-backend.onrender.com/api/jobs
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/jobs";

// Create axios instance with timeout and retry logic
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 second timeout (handles Render cold starts)
});

// Retry logic: if a request fails, retry up to 2 more times
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Only retry on network errors or 503 (DB connecting)
    if (!config._retryCount) config._retryCount = 0;

    if (config._retryCount < 2 && (error.code === "ECONNABORTED" || !error.response || error.response.status === 503)) {
      config._retryCount += 1;
      // Wait 2 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export const getJobs = () => api.get("");

export const addJob = (jobData) => api.post("", jobData);

export const updateJob = (id, updates) => api.put(`/${id}`, updates);

export const deleteJob = (id) => api.delete(`/${id}`);
