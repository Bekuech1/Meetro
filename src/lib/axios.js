import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const API = axios.create({
  baseURL: "https://ujc35n5wgi.execute-api.eu-north-1.amazonaws.com/dev",
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const idToken = localStorage.getItem("idToken");
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
},
(error) => {
  console.log(error);
  return Promise.reject(error);
}
)

let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed(token) {
  subscribers.map((cb) => cb(token))
}

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            resolve(axios(originalRequest));
          })
        })
      }

      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/refresh", { refresh_token: refreshToken });

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        useAuthStore.getState().setAccessToken(newAccessToken);
        useAuthStore.getState().setRefreshToken(newRefreshToken);

        API.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        onRefreshed(newAccessToken);
        subscribers = [];

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
)

export default API;
