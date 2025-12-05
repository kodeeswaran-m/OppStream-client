// AMDashboard.tsx
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
  const { user } = useSelector((state: RootState) => state.auth); // logged-in AM

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  console.log("Logged AM:", user);
  console.log("All Employees:", employees);

  // 1️⃣ FILTER employees under the AM
  const teamEmployees = useMemo(() => {
    if (!user?._id) return [];

    const filtered = employees.filter(
      (emp) => String(emp.managerId) === String(user._id)
    );

    console.log("Employees under AM:", filtered);
    return filtered;
  }, [employees, user]);

  // 2️⃣ COUNT CARD
  const totalTeamEmployees = teamEmployees.length;

  // 3️⃣ DONUT CHART - EMPLOYMENT TYPE
  const employeeTypeData = useMemo(() => {
    const map: any = {};

    teamEmployees.forEach((emp) => {
      const type = emp.employmentType || "Unknown";
      map[type] = (map[type] || 0) + 1;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [teamEmployees]);

  console.log("AM EmploymentType Data:", employeeTypeData);

  return (
    <Box p={4}>
      {/* --------------------- HEADER --------------------- */}
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Associate Manager Dashboard
      </Typography>

      {/* --------------------- CARDS --------------------- */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
              color: "white",
            }}
          >
            <Typography variant="h5">Your Team Members</Typography>
            <Typography variant="h3" fontWeight="bold" mt={1}>
              {totalTeamEmployees}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* --------------------- DONUT CHART --------------------- */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Employment Type Distribution
            </Typography>

            <PieChart width={380} height={350}>
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

      {/* --------------------- EMPLOYEE SUMMARY --------------------- */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Team Employee Summary
      </Typography>

      <Grid container spacing={3}>
        {teamEmployees.map((emp) => (
          <Grid item xs={12} md={6} lg={4} key={emp._id}>
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

                <Typography>
                  <strong>Team:</strong> {emp.team}
                </Typography>

                {emp.skills?.length > 0 && (
                  <Typography>
                    <strong>Skill:</strong> {emp.skills[0].skillName} (
                    {emp.skills[0].experience} yrs)
                  </Typography>
                )}

                <Chip
                  label={emp.isAvailable ? "Available" : "Not Available"}
                  color={emp.isAvailable ? "success" : "warning"}
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
