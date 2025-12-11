import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { getAdminDashboardData } from "../../store/actions/adminDashboardActions";

import { Box, Grid, Paper, Typography } from "@mui/material";
import { Users, FolderOpen, FileText, CheckCircle } from "lucide-react";
import DepartmentPieChart from "./DepartmentPieChart";
import EmployeeDirectory from "../../components/admin/EmployeeDirectory";
import RecentActivityLogs from "../../components/admin/RecentActivityLogs";
import CountUp from "react-countup";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#06b6d4",
];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { employees, businessUnits, logs } = useSelector(
    (state: RootState) => state.admin
  );

  console.log("Emp", employees);
  console.log("BU", businessUnits);
  console.log("Logs", logs);

  const [selectedBU, setSelectedBU] = useState("all");
  const [search, setSearch] = useState("");

  // Column Menu
  const [columnMenuAnchor, setColumnMenuAnchor] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({
    employeeId: true,
    employeeName: true,
    employeeEmail: true,
    department: true,
    team: true,
    role: true,
    totalExperience: true,
    workLocation: true,
    isAvailable: true,
  });

  useEffect(() => {
    dispatch(getAdminDashboardData() as any);
  }, []);

  const toggleColumn = (field: string) =>
    setColumnVisibility((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleColumnMenuOpen = (e: any) => setColumnMenuAnchor(e.currentTarget);
  const handleColumnMenuClose = () => setColumnMenuAnchor(null);

  // FILTER EMPLOYEES
  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    const getBU = (emp: any) =>
      typeof emp.businessUnitId === "string"
        ? emp.businessUnitId
        : emp.businessUnitId?._id;

    if (selectedBU !== "all") {
      data = data.filter((emp) => getBU(emp) === selectedBU);
    }

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      data = data.filter(
        (emp) =>
          emp.empId?.toLowerCase().includes(s) ||
          emp.name?.toLowerCase().includes(s) ||
          emp.email?.toLowerCase().includes(s) ||
          emp.team?.toLowerCase().includes(s) ||
          emp.role?.toLowerCase().includes(s) ||
          emp.department?.toLowerCase().includes(s)
      );
    }

    return data;
  }, [employees, selectedBU, search]);

  // TEAM COUNTS
  const teamCounts = filteredEmployees.reduce((acc: any, emp: any) => {
    if (emp.team) acc[emp.team] = (acc[emp.team] || 0) + 1;
    return acc;
  }, {});

  // PIE CHART DATA
  const combinedPieData = [
    ...businessUnits.map((bu: any, idx: number) => {
      const count = employees.filter((emp: any) => {
        const empBU =
          typeof emp.businessUnitId === "string"
            ? emp.businessUnitId
            : emp.businessUnitId?._id;
        return empBU === bu._id;
      }).length;

      return {
        name: `BU: ${bu.name}`,
        value: count,
        type: "Business Unit",
        color: COLORS[idx % COLORS.length],
      };
    }),

    ...Object.entries(teamCounts).map(([team, count], idx) => ({
      name: `Team: ${team}`,
      value: count,
      type: "Team",
      color: COLORS[(idx + 4) % COLORS.length],
    })),
  ];

  // TABLE COLUMNS
  const allColumns = [
    { field: "employeeId", headerName: "Employee ID", width: 130 },
    { field: "employeeName", headerName: "Name", width: 150 },
    { field: "employeeEmail", headerName: "Email", width: 200 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "team", headerName: "Team", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
    { field: "totalExperience", headerName: "Experience", width: 140 },
    { field: "workLocation", headerName: "Location", width: 150 },

    {
      field: "isAvailable",
      headerName: "Status",
      width: 130,
      renderCell: (params: any) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "15px",
            background: params.value ? "#d1fae5" : "#fee2e2",
            color: params.value ? "#065f46" : "#991b1b",
            fontSize: "13px",
          }}
        >
          {params.value ? "Available" : "Not Available"}
        </span>
      ),
    },
  ];

  const visibleColumns = allColumns.filter((c) => columnVisibility[c.field]);

  // APPROVAL COUNT FUNCTION
  const getApprovalCount = (approvalArr: any[]) => {
    if (!Array.isArray(approvalArr)) return 0;

    return approvalArr.filter((a) => a.status === "APPROVED").length;
  };

  return (
    <Box sx={{ backgroundColor: "#f4f2f5ff", padding: 4 }}>
      <Grid container spacing={3} mt={6}>
        {[
          {
            title: "Total Employees",
            value: employees.length,
            icon: Users,
            bgColor: "#eff6ff", // blue-50
            textColor: "#1d4ed8", // blue-600
            borderColor: "#e2e8f0", // slate-200
          },
          {
            title: "Business Units",
            value: businessUnits.length,
            icon: FolderOpen,
            bgColor: "#f5f3ff", // purple-50
            textColor: "#6b21a8", // purple-700
            borderColor: "#e2e8f0",
          },
          {
            title: "Total Logs",
            value: logs.length,
            icon: FileText,
            bgColor: "#fff7ed", // orange-50
            textColor: "#c2410c", // orange-700
            borderColor: "#e2e8f0",
          },
          {
            title: "Available Employees",
            value: employees.filter((e) => e.status === "Available").length,
            icon: CheckCircle,
            bgColor: "#ecfdf5", // green-50
            textColor: "#047857", // green-700
            borderColor: "#e2e8f0",
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "14px",
                  border: `1px solid ${item.borderColor}`,
                  bgcolor: "white",
                  transition: "0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography sx={{ color: "#475569", fontSize: "14px" }}>
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: item.textColor,
                      }}
                    >
                      <CountUp start={0} end={item.value} duration={2} />
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "10px",
                      background: item.bgColor,
                      marginLeft: 3,
                    }}
                  >
                    <Icon size={26} color={item.textColor} />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} mt={6}>
        <DepartmentPieChart />
      </Grid>
      <EmployeeDirectory
        handleColumnMenuOpen={handleColumnMenuOpen}
        columnMenuAnchor={columnMenuAnchor}
        handleColumnMenuClose={handleColumnMenuClose}
        allColumns={allColumns}
        toggleColumn={toggleColumn}
        columnVisibility={columnVisibility}
        search={search}
        setSearch={setSearch}
        filteredEmployees={filteredEmployees}
        visibleColumns={visibleColumns}
      />

      <RecentActivityLogs logs={logs} getApprovalCount={getApprovalCount} />
    </Box>
  );
}
