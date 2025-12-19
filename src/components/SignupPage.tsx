import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../store";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";

import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const Signup = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  /* =========================
     VALIDATION FUNCTION
  ========================= */
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) errors.username = "Username is required";
    if (!role) errors.role = "Role is required";

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

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await dispatch(
      signup(username, email, password, confirmPassword, role)
    );

    if (result?.success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (accessToken) navigate("/login");
  }, [accessToken, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Paper
        elevation={6}
        sx={{ padding: 5, width: 350, borderRadius: 3,  mt:10}}
      >
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3} >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Username"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!formErrors.username}
            helperText={formErrors.username}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Role"
            size="small"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            error={!!formErrors.role}
            helperText={formErrors.role}
            sx={{ mb: 2 }}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="reporting manager">Reporting Manager</MenuItem>
            <MenuItem value="associate manager">Associate Manager</MenuItem>
            <MenuItem value="VP">VP</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!formErrors.email}
            helperText={formErrors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ py: 1.2, fontWeight: 600 }}
          >
            {loading ? <CircularProgress size={22} /> : "Sign Up"}
          </Button>

          <Typography textAlign="center" mt={2} fontSize={14}>
            Already have an account?{" "}
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "#8347ad",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </form>

        {error && (
          <Typography color="error" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Signup;
