import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import PublicRoute from "./routes/PublicRoute";
import Unauthorized from "./pages/Unauthorized";
import { routeConfig } from "./routes/RouteConfig";
import ProtectedLayout from "./routes/ProtectedLayout";
import Navbar from "./components/common/Navbar";
import WelcomePage from "./components/WelcomePage";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./store/actions/authActions";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "./store";
import type { AnyAction } from "redux";

function AppContent() {
  const location = useLocation();
  // const { showMessage } = useSnackbar();

  const hideNavbarRoutes = ["/"]; // Hide navbar on welcome page

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<WelcomePage />} />

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

        {/* Dynamic Role Routes */}
        {Object.entries(routeConfig).map(([role, routes]) => (
          <Route key={role} element={<ProtectedLayout allowedRoles={[role]} />}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        ))}

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

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
