import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3200/api",
  withCredentials: true, // Send session cookie
});

let authToastShown = false;

api.interceptors.response.use(
  (response) => {
    if (response.config?.url?.includes("/auth/login")) {
      authToastShown = false;
    }

    return response;
  },
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("isLogin");
      window.dispatchEvent(new Event("auth:logout"));

      if (!authToastShown) {
        authToastShown = true;
        toast.error(error.response?.data?.message || "Please login to continue");
      }

      if (window.location.pathname !== "/login") {
        setTimeout(() => {
          window.location.replace("/login");
        }, 300);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
