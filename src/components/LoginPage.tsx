import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { login } from "../store/actions/authActions";

import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";

// MUI Components
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (accessToken) navigate("/dashboard");
  }, [accessToken, navigate]);

  /* =========================
     VALIDATION
  ========================= */
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(login(email, password));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
      sx={{ backgroundColor: "#f4f6f8" }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 340, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          Login
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            fullWidth
            size="small"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <TextField
            label="Password"
            fullWidth
            size="small"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Login"}
          </Button>
        </form>

        <Typography textAlign="center" mt={2} fontSize={14}>
          Don't have an account?{" "}
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#8347ad",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
