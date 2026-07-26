import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../api/axios";

const GetStudent = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  // Fetch all students or searched students
  const getUsers = async (searchValue = "") => {
    try {
      setLoading(true);

      const response = await api.get("/students", {
        params: {
          search: searchValue.trim(),
        },
      });

      setUsers(response.data.data || []);
    } catch (error) {
      if (error.response?.status === 401) return;

      toast.error(
        error.response?.data?.message || "Failed to fetch students."
      );
    } finally {
      setLoading(false);
    }
  };

  // Search when the form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    getUsers(search);
  };

  // Update search input
  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    // Fetch all students when the input is cleared
    if (value.trim() === "") {
      getUsers("");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/students/${id}`);

      // Remove deleted student from state
      setUsers((previousUsers) =>
        previousUsers.filter((student) => student._id !== id)
      );

      toast.success("Student deleted successfully.");
    } catch (error) {
      if (error.response?.status === 401) return;

      toast.error(
        error.response?.data?.message || "Failed to delete student."
      );
    }
  };

  return (
    <div className="container py-5">
      {/* Page heading */}
      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">
          <i className="bi bi-people-fill me-2"></i>
          Student Records
        </h1>

        <p className="text-muted fs-5">
          Manage Student Information Easily
        </p>
      </div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        {/* Table header and search */}
        <div className="bg-dark text-white p-3">
          <div className="row align-items-center g-3">
            <div className="col-md-6">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-table me-2"></i>
                Student List
              </h3>
            </div>

            <div className="col-md-6">
              <form className="input-group" onSubmit={handleSearch}>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by Name, City or Course"
                  value={search}
                  onChange={handleSearchChange}
                />

                <button type="submit" className="btn btn-light">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Student table */}
        <div
          className="table-responsive"
          style={{ maxHeight: "520px", overflowY: "auto" }}
        >
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary sticky-top">
              <tr>
                <th className="px-3 py-3">
                  <i className="bi bi-person-fill me-2"></i>
                  Name
                </th>

                <th className="px-3 py-3">
                  <i className="bi bi-envelope-fill me-2"></i>
                  Email
                </th>

                <th className="px-3 py-3">
                  <i className="bi bi-calendar-fill me-2"></i>
                  Age
                </th>

                <th className="px-3 py-3">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  City
                </th>

                <th className="px-3 py-3">
                  <i className="bi bi-book-fill me-2"></i>
                  Course
                </th>

                <th className="px-3 py-3 text-center">
                  <i className="bi bi-gear-fill me-2"></i>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>

                    <p className="text-muted mt-2 mb-0">
                      Loading students...
                    </p>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((item) => (
                  <tr key={item._id}>
                    <td className="px-3 py-3 fw-semibold">
                      {item.name}
                    </td>

                    <td className="px-3 py-3">
                      {item.email}
                    </td>

                    <td className="px-3 py-3">
                      {item.age}
                    </td>

                    <td className="px-3 py-3">
                      {item.city}
                    </td>

                    <td className="px-3 py-3">
                      {item.course}
                    </td>

                    <td className="px-3 py-3">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm fw-semibold"
                          onClick={() =>
                            navigate(`/edit/${item._id}`)
                          }
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Update
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm fw-semibold"
                          onClick={() => handleDelete(item._id)}
                        >
                          <i className="bi bi-trash-fill me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-muted py-5"
                  >
                    <i className="bi bi-inbox fs-1 d-block mb-2"></i>

                    {search
                      ? `No students found for "${search}"`
                      : "No students found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetStudent;
