import { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";
import EmployeeLogsTable from "../EmployeeLogsTable";
import UserLogsTable from "../common/UserLogsTable";
import PendingApprovalLogsTable from "../common/PendingApprovalLogsTable";
import ApprovalStatusLogsTable from "../common/ApprovalStatusLogsTable";

const LogTables = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ backgroundColor: "#f4f2f5ff", paddingTop: 0.2, height: "100vh" }}
    >
      <Paper
        elevation={3}
        sx={{
          margin: 6,
          borderRadius: 3,
          marginTop: 9,
        }}
      >
        {/* Tabs */}
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{
            style: {
              height: "2px",
              borderRadius: "4px",
              backgroundColor: "#8347AD",
            },
          }}
          sx={{
            marginBottom: 1,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "900",
              fontSize: "1rem",
              paddingY: 0,
              borderRadius: "10px",
              transition: "0.9s",
              outline:"none"
            },
            "& .Mui-selected": {
              color: "#8347AD",
              backgroundColor: "#f2eef4ff",
            },
            "& .MuiTab-root:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Tab label="Pending Approval Logs" />
          <Tab label="Approved/Rejected Logs" />
          <Tab label="Reporting Line Employees Log" />
          <Tab label="My Logs" />
        </Tabs>

        {/* Tab Panels */}
        <Box sx={{padding:2}} hidden={value !== 0}>
          <PendingApprovalLogsTable />
        </Box>

        <Box sx={{padding:2}} hidden={value !== 1}>
          <ApprovalStatusLogsTable />
        </Box>
        <Box sx={{padding:2}} hidden={value !== 2}>
          <EmployeeLogsTable />
        </Box>

        <Box sx={{padding:2}} hidden={value !== 3}>
          <UserLogsTable />
        </Box>
      </Paper>
    </Box>
  );
};

export default LogTables;
