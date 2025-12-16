import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import type { Employee } from "../../store/reducers/employeeReducer";
import { useNavigate } from "react-router-dom";
import { getRouteRole } from "../../utils/getRouteRole";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface EmployeeCardProps {
  employees: Employee[];
}

const EmployeeCard = ({ employees }: EmployeeCardProps) => {
  console.log("employees", employees);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
      const routeRole = getRouteRole(user?.role);
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        border: "1px solid #e8e8e8",
        boxShadow: "none",
      }}
    >
      <Table>
        {/* ---------- HEADER ---------- */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f0fa" }}>
            <TableCell sx={{ fontWeight: 600 }}>Employee Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Experience</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Employment Type</TableCell>
          </TableRow>
        </TableHead>

        {/* ---------- BODY ---------- */}
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.employeeId}
              hover
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#faf5ff",
                },
              }}
              onClick={() =>
                navigate(`/${routeRole}/employee-logs/${employee?._id}`)
              }
            >
              <TableCell sx={{ fontWeight: 600, color: "#4a148c" }}>
                {employee.employeeName}
              </TableCell>

              <TableCell>{employee.employeeId}</TableCell>
              <TableCell>{employee.department}</TableCell>

              <TableCell>
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
              </TableCell>

              <TableCell>
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
              </TableCell>

              <TableCell>
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
              </TableCell>

              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeCard;
