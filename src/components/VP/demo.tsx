


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
 
  // 1️⃣ COUNT OF EMPLOYEES
  const totalEmployees = employees.length;
 
  // 2️⃣ EMPLOYMENT TYPE DISTRIBUTION
  const employeeTypeData = useMemo(() => {
    const typeMap: Record<string, number> = {};
    employees.forEach((emp) => {
      const type = emp.employmentType || "Unknown";
      typeMap[type] = (typeMap[type] || 0) + 1;
    });
    return Object.keys(typeMap).map((key) => ({ name: key, value: typeMap[key] }));
  }, [employees]);
 
  // 3️⃣ ROLE DISTRIBUTION
  const roleData = useMemo(() => {
    const roleMap: Record<string, number> = {};
    employees.forEach((emp) => {
      const role = emp.role || "Unknown";
      roleMap[role] = (roleMap[role] || 0) + 1;
    });
    return Object.keys(roleMap).map((key) => ({ name: key, value: roleMap[key] }));
  }, [employees]);
 
  // 4️⃣ EMPLOYEE SUMMARY
  const employeeCardList = employees;
 
  return (
    <Box p={4}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center" mt={5}>
        Employee Analytics Dashboard
      </Typography>
 
      {/* Top Row: Total Employees Card */}
