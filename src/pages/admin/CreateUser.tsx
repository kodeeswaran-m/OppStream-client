import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getBusinessUnits } from "../../store/actions/adminActions";

import type { RootState } from "../../store";
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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useSnackbar } from "../../context/SnackbarContext";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

// ---------------- Reducer ----------------
const initialForm = {
  username: "ram",
  role: "employee",
  email: "ram@gmail.com",
  password: "Ram@123",
  confirmPassword: "Ram@123",
  businessUnitId: "",
  employeeId: "ACE9098",
};

function formReducer(state: typeof initialForm, action: any) {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialForm;
    default:
      return state;
  }
}

const CreateUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showMessage } = useSnackbar();

  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { businessUnits } = useSelector((state: RootState) => state.admin);

  const [form, updateForm] = useReducer(formReducer, initialForm);

  const handleChange = (field: string, value: string) => {
    updateForm({ type: "UPDATE", field, value });
  };

  // ---------------- Load Business Units ----------------
  useEffect(() => {
    dispatch(getBusinessUnits() as any);
  }, [dispatch]);

  // ---------------- Submit Handler ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Base payload
    const payload: any = {
      username: form.username,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: form.role,
    };

    // Add extra fields for non-admin roles
    if (form.role !== "admin") {
      payload.businessUnitId = form.businessUnitId;
      payload.employeeId = form.employeeId;
    }

    const result = await dispatch(createUser(payload));

    if (result.success) {
      showMessage("User created successfully.");
      updateForm({ type: "RESET" }); // ← RESET FORM HERE
    }
  };

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
      <Paper elevation={6} sx={{ padding: 5, width: 380, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={form.username}
            size="small"
            sx={{ mb: 2 }}
            onChange={(e) => handleChange("username", e.target.value)}
          />

          <TextField
            select
            fullWidth
            label="Role"
            value={form.role}
            size="small"
            sx={{ mb: 2 }}
            onChange={(e) => handleChange("role", e.target.value)}
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
            value={form.email}
            size="small"
            sx={{ mb: 2 }}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            size="small"
            value={form.password}
            sx={{ mb: 2 }}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            size="small"
            value={form.confirmPassword}
            sx={{ mb: 3 }}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />

          {/* Conditionally show Employee ID + BU */}
          {form.role !== "admin" && (
            <>
              <TextField
                fullWidth
                label="Employee ID"
                value={form.employeeId}
                size="small"
                sx={{ mb: 2 }}
                onChange={(e) => handleChange("employeeId", e.target.value)}
              />

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Business Unit</InputLabel>
                <Select
                  native
                  value={form.businessUnitId}
                  onChange={(e) =>
                    handleChange("businessUnitId", e.target.value)
                  }
                  label="Business Unit"
                >
                  <option value="">Select Business Unit</option>

                  {businessUnits.length === 0 ? (
                    <option disabled>No Business Units Found</option>
                  ) : (
                    businessUnits.map((bu) => (
                      <option key={bu._id} value={bu._id}>
                        {bu.name}
                      </option>
                    ))
                  )}
                </Select>
              </FormControl>
            </>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            size="small"
            disabled={loading}
            sx={{ py: 1.2, fontWeight: 600 }}
          >
            {loading ? <CircularProgress size={22} /> : "Submit"}
          </Button>
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

export default CreateUser;


