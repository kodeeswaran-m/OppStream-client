import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import PublicRoute from "./routes/PublicRoute";
import Unauthorized from "./pages/Unauthorized";
import { routeConfig } from "./routes/RouteConfig";
import ProtectedLayout from "./routes/ProtectedLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "./store";
import { loadUser } from "./store/actions/authActions";
import {type AnyAction } from "redux";
import Navbar from "./components/common/Navbar";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;



