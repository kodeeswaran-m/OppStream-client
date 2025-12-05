import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { RootState, AppDispatch } from "../../store";
import { getEmployees } from "../../store/actions/employeeActions";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // FullTime, Intern, Contract

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  // 1️⃣ COUNT OF EMPLOYEES
  const totalEmployees = employees.length;

  // 2️⃣ DONUT CHART - EMPLOYMENT TYPE (FullTime / Intern / Contract)
  const employeeTypeData = useMemo(() => {
    const typeMap: any = {};

    employees.forEach((emp) => {
      const type = emp.employmentType || "Unknown";
      typeMap[type] = (typeMap[type] || 0) + 1;
    });

    return Object.keys(typeMap).map((key) => ({
      name: key,
      value: typeMap[key],
    }));
  }, [employees]);

  // 3️⃣ EMPLOYEE SUMMARY
  const employeeCardList = employees;

  return (
    <Box p={4}>
      {/* --------------------- HEADER --------------------- */}
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center" mt={5}>
        Employee Analytics Dashboard
      </Typography>

      {/* --------------------- TOP ROW: CARD + CHART --------------------- */}
      <Grid container spacing={3} mb={5}>
        {/* Total Employees Card */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
              color: "white",
              height: "30%",
              
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">Total Employees</Typography>
            <Typography variant="h3" fontWeight="bold" mt={1}>
              {totalEmployees}
            </Typography>
          </Paper>
        </Grid>

        {/* Donut Chart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Employment Type Distribution
            </Typography>

            <PieChart width={400} height={300}>
              <Pie
                data={employeeTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {employeeTypeData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>

      {/* --------------------- EMPLOYEE SUMMARY CARDS --------------------- */}
      <Typography variant="h5" fontWeight="bold" mb={2} >
        Employee Summary
      </Typography>

      <Grid container spacing={3}>
        {employeeCardList.map((emp) => (
          <Grid item xs={12} md={6} lg={4} key={emp._id} width={300}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <Typography variant="h6" fontWeight="700">
                {emp.employeeName}
              </Typography>

              <Typography variant="body2" color="gray" mt={0.5}>
                {emp.employeeId} • {emp.department}
              </Typography>

              <Stack direction="column" spacing={1} mt={2}>
                <Typography>
                  <strong>Experience:</strong> {emp.totalExperience} yrs
                </Typography>

                <Typography>
                  <strong>Location:</strong> {emp.workLocation}
                </Typography>

                <Typography>
                  <strong>Employment Type:</strong> {emp.employmentType}
                </Typography>

                <Chip
                  label={emp.status}
                  color={emp.status === "Available" ? "success" : "warning"}
                  sx={{ width: "fit-content", fontWeight: "bold" }}
                />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
