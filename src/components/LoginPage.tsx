import  { useState, useEffect } from "react";
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
  const [email, setEmail] = useState<string>("buh@gmail.com");
  const [password, setPassword] = useState<string>("Pass@123");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (accessToken) navigate("/dashboard");
  }, [accessToken, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="100vw"
        sx={{ backgroundColor: "#f4f6f8" }}
      >
        <Paper elevation={6} sx={{ padding: 4, width: 320, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              size="small"
              margin="normal"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              fullWidth
              size="small"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              sx={{ mt: 3, py: 1.2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : "Login"}
            </Button>
          </form>

          <Typography textAlign="center" mt={2} fontSize={14} color="primary">
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/signup")}
            >
              Click here
            </span>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
