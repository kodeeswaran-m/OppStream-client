import React, { useState, useEffect } from "react";
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

  const [username, setUsername] = useState("sam");
  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("sam@gmail.com");
  const [password, setPassword] = useState("Sam@123");
  const [confirmPassword, setConfirmPassword] = useState("Sam@123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(signup(username, email, password, confirmPassword, role));

     const result = await dispatch(
    signup(username, email, password, confirmPassword, role)
  );

  console.log("Signup result =>", result);

  if (result.success) {
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
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 380, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            sx={{ mb: 2 }}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            select
            fullWidth
            label="Role"
            value={role}
            sx={{ mb: 2 }}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="reporting manager">Reporting Manager</MenuItem>
            <MenuItem value="associate manager">Associate Manager</MenuItem>
            <MenuItem value="VP">VP</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Email"
            value={email}
            sx={{ mb: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            sx={{ mb: 2 }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            sx={{ mb: 3 }}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

          <Typography textAlign="center" mt={2} fontSize={14} color="primary" >
            Already have an account? 
            <span style={{cursor:"pointer", textDecoration:"underline"}} onClick={() => navigate("/login")}>Click here</span>
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
