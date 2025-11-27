import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" gutterBottom>403 — Access denied</Typography>
      <Typography mb={2}>You don't have permission to view this page.</Typography>
      <Button variant="contained" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
    </Box>
  );
};

export default Unauthorized;
