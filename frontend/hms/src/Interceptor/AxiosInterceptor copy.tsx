import axios, { InternalAxiosRequestConfig } from "axios";
import store from "../Store";
import { removeJwt } from "../Slices/JwtSlice";
import { removeUser } from "../Slices/UserSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000",
});

// Request interceptor → attach token
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["X-Secret-Key"] = "SECRET";
  return config;
});

// Response interceptor → auto-logout if token expired
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 500 || error.response.status === 500)) {
      // Save current path so user can come back after login
      const currentPath = window.location.pathname;
      localStorage.setItem("redirectPath", currentPath);

      // Clear token + user from redux
      store.dispatch(removeJwt());
      store.dispatch(removeUser());

      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
