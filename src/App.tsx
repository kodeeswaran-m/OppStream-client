import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import PublicRoute from "./routes/PublicRoute";
import Unauthorized from "./pages/Unauthorized";
import { routeConfig } from "./routes/RouteConfig";
import ProtectedLayout from "./routes/ProtectedLayout";
=======
>>>>>>> bc794095affee0583c9b8b469e0d3d6ece242914
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "./store";
import { loadUser } from "./store/actions/authActions";
import {type AnyAction } from "redux";
import Navbar from "./components/common/Navbar";

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
<<<<<<< HEAD
  const dispatch: AppDispatch = useDispatch();
=======
  const dispatch = useDispatch<any>();
>>>>>>> bc794095affee0583c9b8b469e0d3d6ece242914

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
<<<<<<< HEAD
          <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
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

        {/* DYNAMIC ROLE-BASED ROUTES */}
        {Object.entries(routeConfig).map(([role, routes]) => (
          <Route
            key={role}
            element={<ProtectedLayout allowedRoles={[role]} />}
          >
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))} 
          </Route>
        ))}

        {/* UNAUTHORIZED PAGE */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
=======
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
>>>>>>> bc794095affee0583c9b8b469e0d3d6ece242914
    </BrowserRouter>
  );
}

export default App;
<<<<<<< HEAD



=======
>>>>>>> bc794095affee0583c9b8b469e0d3d6ece242914
