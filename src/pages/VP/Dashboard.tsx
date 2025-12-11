
import { Box, Divider, Typography } from "@mui/material";
import LogDetailsChart from "../../components/VP/LogDetailsChart";
import EmployeeDetailsChart from "../../components/VP/EmployeeDetailsChart";
import EmployeeList from "../../components/VP/EmployeeList";

const VPDashboard = () => {
  return (
    <Box sx={{ backgroundColor: "#f4f2f5ff", minHeight: "100vh" }}>
      
      {/* Charts Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          // gap: 2,
          justifyContent: "center",
          alignItems: "center",
          pt: 4,
        }}
      >
        <LogDetailsChart />
        <EmployeeDetailsChart />
      </Box>

      {/* Divider Section */}
      <Divider sx={{ my: 1, borderColor: "#bfbfbf" }} />

      {/* Employee List */}
      <Box sx={{ px: 2 }}>
        <EmployeeList />
      </Box>
    </Box>
  );
};

export default VPDashboard;

