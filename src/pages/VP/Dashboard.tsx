import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/actions/employeeActions";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

// ---------------------- COLORS FOR CHART ----------------------
const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

// ---------------------- DASHBOARD COMPONENT ----------------------
const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector((state: any) => state.employee);

  useEffect(() => {
    dispatch(getEmployees() as any);
  }, [dispatch]);

  // ---------------------- COUNT EMPLOYEE TYPES ----------------------
  const empTypeCounts = employees.reduce((acc: any, emp: any) => {
    acc[emp.employmentType] = (acc[emp.employmentType] || 0) + 1;
    return acc;
  }, {});

  const empTypeChartData = Object.keys(empTypeCounts).map((type) => ({
    name: type,
    value: empTypeCounts[type],
  }));

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Employee Dashboard
      </Typography>

      {/* ---------------- EMPLOYEE COUNT CARDS ---------------- */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, borderRadius: "15px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Total Employees</Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {employees.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, borderRadius: "15px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Full Time</Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {empTypeCounts["Full Time"] || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, borderRadius: "15px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Intern & Contract</Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {(empTypeCounts["Intern"] || 0) +
                  (empTypeCounts["Contract"] || 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ---------------- DONUT CHART ---------------- */}
      <Box mt={5}>
        <Paper sx={{ p: 3, borderRadius: "15px" }}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            Employee Type Distribution
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={empTypeChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {empTypeChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* ---------------- EMPLOYEE SUMMARY CARDS ---------------- */}
      <Box mt={5}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Employee Summary
        </Typography>

        <Grid container spacing={3}>
          {employees.map((emp: any) => (
            <Grid item xs={12} sm={6} md={4} key={emp._id}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "15px",
                  boxShadow: 4,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      {emp.employeeName.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        {emp.employeeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {emp.employeeId} • {emp.department}
                      </Typography>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body1" fontWeight="bold">
                      {emp.team}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {emp.totalExperience} yrs
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {emp.workLocation}
                    </Typography>

                    <Typography
                      mt={1}
                      variant="body2"
                      color={emp.isAvailable ? "green" : "red"}
                    >
                      {emp.isAvailable ? "Available" : "Not Available"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
