import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getRouteRole } from "../utils/getRouteRole";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const routeRole = getRouteRole(user?.role);

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Data Logger</h1>

      <p className="welcome-subtitle">
        Monitor. Track. Analyze. Your Data in One Place.
      </p>

      {/* LOGIN BUTTON */}
      <Button
        variant="contained"
        className="login-btn"
        onClick={() => {
          user && user?.role !== null
            ? navigate(`/${routeRole}/dashboard`)
            : navigate("/login");
        }}
      >
        {user && user?.role !== null ? "Dashboard" : "Login"}
      </Button>

      <div className="footer-text">© 2025 Data Logger Application</div>
    </div>
  );
}
