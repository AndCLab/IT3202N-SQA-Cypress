import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;

    // don't try to refresh on login
    if (isUnauthorized && originalRequest.url.includes("login")) {
      return Promise.reject(error);
    }

    if (isUnauthorized && originalRequest.url.includes("refresh")) {
      return Promise.reject(error); // Reject for refresh request errors
    } else if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.get("refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(new Error("Failed to refresh token"));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
