import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import RoleRoute from "./routes/RoleRoute";
import Dashboard from "./pages/Dashboard";
import ManagerPage from "./pages/ManagerPage";
import DeliveryPage from "./pages/DeliveryPage";
import AdminPage from "./pages/AdminPage";
import PublicRoute from "./routes/PublicRoute";
import Unauthorized from "./pages/Unauthorized";

import Navbar from "./components/NavBar";
import { loadUser } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ background: "white", minHeight: "100vh", paddingTop: 20 }}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* EMPLOYEE */}
          <Route
            path="/employeeDashboard"
            element={
              <RoleRoute allowedRoles={["employee"]}>
                <Dashboard />
              </RoleRoute>
            }
          />

          {/* REPORTING MANAGER */}
          <Route
            path="/reportingManagerDashboard"
            element={
              <RoleRoute allowedRoles={["reporting manager"]}>
                <ManagerPage />
              </RoleRoute>
            }
          />

          {/* ASSOCIATE MANAGER */}
          <Route
            path="/associateManagerDashboard"
            element={
              <RoleRoute allowedRoles={["associate manager"]}>
                <DeliveryPage />
              </RoleRoute>
            }
          />

          {/* VP */}
          <Route
            path="/vpDashboard"
            element={
              <RoleRoute allowedRoles={["VP"]}>
                <AdminPage />
              </RoleRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
