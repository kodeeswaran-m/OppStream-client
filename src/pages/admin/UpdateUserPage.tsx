import  { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  MenuItem,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserById } from "../../services/adminService";
import { useSnackbar } from "../../context/SnackbarContext";

const UpdateUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  // -------------------------------------------------
  // Fetch user details
  // -------------------------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(userId!);
        setFormData({
          username: res.user.username,
          email: res.user.email,
          role: res.user.role,
        });
      } catch (err) {
        showMessage("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, showMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await updateUserById(userId!, formData);

      if (res.success) {
        showMessage("User updated successfully!");
        navigate("/admin/users"); 
      }
    } catch (err) {
      showMessage("Failed to update user");
    }
  };

  if (loading) return <p>Loading user details...</p>;

  return (
    <Box sx={{ p: 4 , backgroundColor: "#f4f2f5ff", height:"100vh"}}>
      <Paper sx={{ p: 4, borderRadius: 3, width: 450, margin: "auto", mt:8 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Update User
        </Typography>

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="reporting manager">Reporting Manager</MenuItem>
          <MenuItem value="associate manager">Associate Manager</MenuItem>
          <MenuItem value="VP">VP</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Update User
        </Button>
      </Paper>
    </Box>
  );
};

export default UpdateUserPage;
