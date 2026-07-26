import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../api/axios";

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
        remember: form.remember,
      });

      localStorage.setItem("isLogin", "true");

      if (setIsLogin) {
        setIsLogin(true);
      }

      toast.success(
        response.data.message || "Login successful"
      );

      navigate("/list");
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message ||
        "Cannot connect to the server";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center px-3 py-5">
      <div className="card login-card border-0 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="login-header bg-primary text-white text-center px-3">
          <i className="bi bi-person-circle login-user-icon"></i>

          <h1 className="fw-bold mt-3 mb-2">
            Admin Login
          </h1>

          <p className="fs-5 mb-0">
            Student Management System
          </p>
        </div>

        {/* Form */}
        <div className="card-body bg-white">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="form-label fs-5"
              >
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Enter Admin Email"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label fs-5"
              >
                <i className="bi bi-lock-fill text-danger me-2"></i>
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Enter Password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Remember me */}
            <div className="form-check mb-4">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="form-check-input"
              />

              <label
                htmlFor="remember"
                className="form-check-label fs-5"
              >
                Remember Me
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </>
              )}
            </button>

            <p className="text-muted text-center mt-4 mb-0">
              <i className="bi bi-shield-lock-fill text-primary me-1"></i>
              Authorized Admin Only
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
