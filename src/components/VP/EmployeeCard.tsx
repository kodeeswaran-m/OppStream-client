import {  Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import type { Employee } from "../../store/reducers/employeeReducer";
interface EmployeeCardProps {
  employee: Employee;
}
const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          minWidth: 320,
          cursor:"pointer",
          backgroundColor: "white",
          transition: "all 0.3s ease",
          border: "1px solid #e8e8e8",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            borderColor: "#8347AD",
          },
        }}
      >
        {/* Employee Name */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ color: "#4a148c", mb: 1 }}
        >
          {employee.employeeName}
        </Typography>

        {/* Employee ID + Department */}
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {employee.employeeId} • {employee.department}
        </Typography>

        {/* Chips */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label={employee.role}
            size="small"
            sx={{
              bgcolor: "#e8f5e9",
              color: "#2e7d32",
              fontSize: 11,
              fontWeight: 500,
            }}
          />
          <Chip
            label={`${employee.totalExperience} yrs`}
            size="small"
            sx={{
              bgcolor: "#e3f2fd",
              color: "#1976d2",
              fontSize: 11,
              fontWeight: 500,
            }}
          />
          <Chip
            label={employee.workLocation}
            size="small"
            sx={{
              bgcolor: "#fff3e0",
              color: "#ef6c00",
              fontSize: 11,
              fontWeight: 500,
            }}
          />
          <Chip
            label={employee.employmentType}
            size="small"
            sx={{
              bgcolor: "#f3e5f5",
              color: "#9c27b0",
              fontSize: 11,
              fontWeight: 500,
            }}
          />
        </Stack>
      </Paper>
    </Grid>
  );
};

export default EmployeeCard;
