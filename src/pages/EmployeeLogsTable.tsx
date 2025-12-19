import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import { useEffect } from "react";
import { getReportingEmployeeLogs } from "../store/actions/employeeActions";
import type { RootState } from "../store";
import TableSkeleton from "../components/common/TableSkeleton";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const columns = [
  { label: "Employee ID", key: "employeeId" },
  { label: "Employee Name", key: "employeeName" },
  { label: "Role", key: "role" },
  { label: "Requirement Type", key: "requirementType" },
  { label: "Project Name", key: "projectName" },
  { label: "Client Name", key: "clientName" },
  { label: "Urgency", key: "urgency" },
  { label: "Expected Start Date", key: "expectedStart" },
];

const EmployeeLogsTable = () => {
  const { loading, reportingEmployeeLogs, repEmpLogsCount } = useSelector(
    (state: RootState) => state.employee
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportingEmployeeLogs());
  }, []);

  // Helper: Convert log + column to value
  const getCellValue = (log: any, key: string) => {
    switch (key) {
      case "employeeId":
        return log.createdBy.employeeId;

      case "employeeName":
        return log.createdBy.employeeName;

      case "role":
        return log.createdBy.role;

      case "requirementType":
        return log.requirementType;

      case "projectName":
        return log.oppFrom?.projectName || "-";

      case "clientName":
        return log.oppFrom?.clientName || "-";

      case "urgency":
        return log.oppFrom?.urgency || "-";

      case "expectedStart":
        return log.timeline?.expectedStart
          ? new Date(log.timeline.expectedStart).toLocaleDateString()
          : "-";

      default:
        return "-";
    }
  };
  if (loading) {
    return <TableSkeleton rows={6} columns={columns.length} />;
  }
  return (
    <>

     {reportingEmployeeLogs.length !== 0 ? (
            <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "bold",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        {/* <Typography variant="h6" sx={{}}>
          Employee Logs
        </Typography> */}

        <Typography
          variant="h6"
          sx={{
            paddingX: 1,
            paddingY: 0.5,
            fontSize: "12px",
            backgroundColor: "#F2F2F2",
            border: "1px solid #d6d6d6ff",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#e3e3e3ff",
              transform: "scale(1.04)",
            },
          }}
        >
          Count : {repEmpLogsCount}
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          {/* TABLE HEAD */}
          <TableHead sx={{ backgroundColor: "#EFE6F6" }}>
            <TableRow sx={{ height: 40 }}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <strong>{col.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {reportingEmployeeLogs.map((log) => (
              <TableRow
                key={log._id}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  padding: 1,
                  "&:hover": {
                    backgroundColor: "#e3e3e3ff",
                    // cursor: "pointer",
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {getCellValue(log, col.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            </>
          ) : (
            <Typography textAlign={"center"}>No logs found.</Typography>
          )}

    </>
  );
};

export default EmployeeLogsTable;
