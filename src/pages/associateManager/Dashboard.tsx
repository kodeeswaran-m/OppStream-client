import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Paper, Chip, Stack } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import type { RootState, AppDispatch } from "../../store";
import { getEmployees } from "../../store/actions/employeeActions";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Chart colors

const AMDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const totalEmployees = employees.length;

  const employeeTypeData = useMemo(() => {
    const typeMap: Record<string, number> = {};
    employees.forEach((emp) => {
      const type = emp.employmentType || "Unknown";
      typeMap[type] = (typeMap[type] || 0) + 1;
    });
    return Object.keys(typeMap).map((key) => ({ name: key, value: typeMap[key] }));
  }, [employees]);

  const roleData = useMemo(() => {
    const roleMap: Record<string, number> = {};
    employees.forEach((emp) => {
      const role = emp.role || "Unknown";
      roleMap[role] = (roleMap[role] || 0) + 1;
    });
    return Object.keys(roleMap).map((key) => ({ name: key, value: roleMap[key] }));
  }, [employees]);

  return (
    <Box p={4}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center" mt={5}>
        Employee Analytics Dashboard
      </Typography>

      {/* Top Row: Total Employees + Charts */}
      <Grid container spacing={3} mb={5}>
        {/* Total Employees */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
              color: "white",
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

        {/* Employment Type Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Employment Type
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={employeeTypeData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {employeeTypeData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </Paper>
        </Grid>

        {/* Role Distribution Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="600" mb={2}>
              Role Distribution
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {roleData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>

      {/* Employee Summary Cards */}
      <Paper elevation={0} sx={{ p: 3, bgcolor: "white", mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: "#1a237e" }}>
          Employee Summary
        </Typography>
        <Grid container spacing={2}>
          {employees.map((employee) => (
            <Grid item xs={12} sm={6} md={4} key={employee._id}>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderColor: "#8347AD",
                  },
                }}
              >
                {/* Employee Name */}
                <Typography variant="subtitle1" sx={{ color: "#1976d2", mb: 1 , fontSize:15}}>
                  {employee.employeeName}
                </Typography>

                {/* Employee ID + Department */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {employee.employeeId} • {employee.department}
                </Typography>

                {/* Colored Chips */}
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                  <Chip
                    label={employee.role}
                    size="small"
                    sx={{ bgcolor: "#d0f0c0", color: "#2e7d32", fontWeight: "normal", fontSize:10 }}
                  />
                  <Chip
                    label={`${employee.totalExperience} yrs`}
                    size="small"
                    sx={{ bgcolor: "#cce5ff", color: "#1976d2", fontWeight: "normal", fontSize:10 }}
                  />
                  <Chip
                    label={employee.workLocation}
                    size="small"
                    sx={{ bgcolor: "#fff3e0", color: "#ed6c02", fontWeight: "normal", fontSize:10 }}
                  />
                  <Chip
                    label={employee.employmentType}
                    size="small"
                    sx={{ bgcolor: "#f3e5f5", color: "#9c27b0", fontWeight: "normal", fontSize:10 }}
                  />
                  {/* <Chip
                    label={employee.status}
                    size="small"
                    sx={{
                      bgcolor: employee.status === "Available" ? "#f3e5f5" : "#ffebee",
                      color: employee.status === "Available" ? "#9c27b0" : "#d32f2f",
                      fontWeight: "normal",
                    }}
                  /> */}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default AMDashboard;
