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

// Helper function to logout user
const handleLogout = async () => {
  const { setAccessToken, setUser } = useAuthStore.getState();

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

  // Clear auth state and localStorage
  setUser(null);
  setAccessToken(null);
  localStorage.removeItem("auth-storage");

  // Redirect to home page
  window.location.href = "/";
};

// ----- RESPONSE INTERCEPTOR -----
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const { setAccessToken } = useAuthStore.getState();

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
            if (!token) {
              // Token refresh failed, logout user
              handleLogout();
              return Promise.reject(error);
            }
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch(err => {
            handleLogout();
            return Promise.reject(err);
          });
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

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        // Update Zustand state
        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Logout and redirect
        await handleLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
