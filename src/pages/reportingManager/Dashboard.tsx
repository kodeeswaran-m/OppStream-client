import { Box } from "@mui/material";
import LogDetailsChart from "../../components/VP/LogDetailsChart";
import EmployeeList from "../../components/VP/EmployeeList";

const VPDashboard = () => {
  return (
    <Box sx={{ backgroundColor: "#f4f2f5ff" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f2f5ff",
          paddingTop: 4,
          height: "100vh",
        }}
      >
        <LogDetailsChart />
        {/* <EmployeeDetailsChart /> */}
      </Box>
      <EmployeeList />
    </Box>
  );
};

export default VPDashboard;
