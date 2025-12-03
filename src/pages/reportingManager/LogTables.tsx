import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper
} from "@mui/material";
import EmployeeLogsTable from "../EmployeeLogsTable";
import UserLogsTable from "../common/UserLogsTable";

const LogTables = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
          margin: 6,
        borderRadius: 3,
        marginTop: 3,
      }}
    >
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            height: "4px",
            borderRadius: "4px",
            backgroundColor: "#8347AD",
          },
        }}
        sx={{
          marginBottom: 2,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "600",
            fontSize: "16px",
            paddingY: 1,
            borderRadius: "10px",
            transition: "0.3s",
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
        <Tab label="My Logs" />
        <Tab label="Reporting Line Employees Log" />
      </Tabs>

      {/* Tab Panels */}
      <Box hidden={value !== 0}>
       <UserLogsTable/>
      </Box>

      <Box hidden={value !== 1}>
                <EmployeeLogsTable/>
      </Box>
    </Paper>
  );
};

export default LogTables;
