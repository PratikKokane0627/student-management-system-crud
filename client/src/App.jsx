import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GetStudent from "./components/GetStudent";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import Login from "./components/Login";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );

  return (
    <>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={
            isLogin ? (
              <Navigate to="/list" replace />
            ) : (
              <Login setIsLogin={setIsLogin} />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            isLogin ? (
              <div className="d-flex min-vh-100 flex-column">
                <Navbar setIsLogin={setIsLogin} />

                <main className="flex-grow-1">
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/list" replace />}
                    />

                    <Route path="/list" element={<GetStudent />} />

                    <Route path="/add" element={<AddStudent />} />

                    <Route
                      path="/edit/:id"
                      element={<UpdateStudent />}
                    />

                    <Route
                      path="*"
                      element={<Navigate to="/list" replace />}
                    />
                  </Routes>
                </main>

                <Footer />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#ffffff",
            padding: "14px 18px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "500",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  );
}

export default App;