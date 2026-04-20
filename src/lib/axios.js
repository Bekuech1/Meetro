import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ----- REQUEST INTERCEPTOR -----
API.interceptors.request.use(
  config => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// ----- RESPONSE INTERCEPTOR -----
let isRefreshing = false;
let failedQueue = [];

// Helper function to process the failed requests queue
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ----- RESPONSE INTERCEPTOR -----
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const { setAccessToken, setUser } = useAuthStore.getState();

    // If unauthorized - Token has expired
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Wait for the token to be refreshed
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        // Update Zustand state
        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Logout API call
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/logout`,
            {},
            { withCredentials: true }
          );
        } catch (error) {
          console.error("Error during logout:", error);
        }

        // Clear auth state after redirect initiated
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("auth-storage");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
