import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
  Typography,
  Paper
} from "@mui/material";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getDepartmentStats } from "../../services/adminService";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const DepartmentPieChart = () => {
  const [department, setDepartment] = useState("all");
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState<"department" | "team">("department");

  // Fetch Stats
  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await getDepartmentStats(department);

      setChartType(res.type);

      // Convert {Insurance: 10, BFS: 12} → [{name:"Insurance", value:10}, ...]
      const formattedData = Object.entries(res.data).map(([key, value]) => ({
        name: key,
        value,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.log("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [department]);

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {chartType === "department"
          ? "Department Distribution"
          : `${department} - Team Distribution`}
      </Typography>

      {/* Dropdown */}
      <FormControl size="small" sx={{ width: 250, mb: 3 }}>
        <InputLabel>Select Department</InputLabel>
        <Select
          value={department}
          label="Select Department"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <MenuItem value="all">All Departments</MenuItem>
          <MenuItem value="Insurance">Insurance</MenuItem>
          <MenuItem value="BFS">BFS</MenuItem>
          <MenuItem value="JLM">JLM</MenuItem>
        </Select>
      </FormControl>

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <PieChart width={400} height={350}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              dataKey="value"
              nameKey="name"
            //   label={(entry) => `${entry.name} (${entry.value})`}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      )}
    </Paper>
  );
};

export default DepartmentPieChart;
