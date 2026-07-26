import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../api/axios";

const Navbar = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `nav-link fw-semibold ${
      isActive ? "text-warning" : "text-white"
    }`;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logout successful");
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "Logout failed");
      }
    } finally {
      localStorage.removeItem("isLogin");
      setIsLogin(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        {/* Brand */}
        <NavLink
          to="/list"
          className="navbar-brand fw-bold d-flex align-items-center"
        >
          <i className="bi bi-mortarboard-fill me-2"></i>
          Student Management System
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <NavLink to="/list" className={navLinkClass}>
                <i className="bi bi-people-fill me-1"></i>
                Student List
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/add" className={navLinkClass}>
                <i className="bi bi-person-plus-fill me-1"></i>
                Add Student
              </NavLink>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="btn btn-danger fw-semibold"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
