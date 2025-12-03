import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Data Logger</h1>

      <p className="welcome-subtitle">
        Monitor. Track. Analyze.  
        Your Data in One Place.
      </p>

      {/* LOGIN BUTTON */}
      <Button
        variant="contained"
        className="login-btn"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>

      <div className="footer-text">
        © 2025 Data Logger Application
      </div>
    </div>
  );
}
