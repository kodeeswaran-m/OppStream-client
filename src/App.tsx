import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "./store";
import type { AnyAction } from "redux";

import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import WelcomePage from "./components/WelcomePage";
import Navbar from "./components/common/Navbar";
import Unauthorized from "./pages/Unauthorized";

import PublicRoute from "./routes/PublicRoute";
import ProtectedLayout from "./routes/ProtectedLayout";
import { routeConfig } from "./routes/RouteConfig";
import { loadUser } from "./store/actions/authActions";

import "./App.css";

/* =========================
   App Content (Routes)
   ========================= */

function AppContent() {
  const location = useLocation();

  // Hide navbar only on welcome page
  const hideNavbarRoutes = ["/"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Welcome */}
        <Route path="/" element={<WelcomePage />} />

        {/* Public Routes */}
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

        {/* Role-based Protected Routes */}
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

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

/* =========================
   App Root
   ========================= */

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export default function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
