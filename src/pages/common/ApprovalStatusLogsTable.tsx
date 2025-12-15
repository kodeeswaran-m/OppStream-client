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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import { useEffect, useState } from "react";

import { getApprovedOrRejectedLogs } from "../../store/actions/employeeActions";
import type { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { getRouteRole } from "../../utils/getRouteRole";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const columns = [
  { label: "Employee ID", key: "employeeId" },
  { label: "Employee Name", key: "employeeName" },
  { label: "Role", key: "role" },
  { label: "Requirement Type", key: "requirementType" },
  { label: "Project Name", key: "projectName" },
  { label: "Client Name", key: "clientName" },
  { label: "Urgency", key: "urgency" },
  { label: "Expected Start", key: "expectedStart" },
  { label: "Approval Status", key: "approvalStatus" },
  { label: "Waiting For", key: "waitingFor" },
];

const ApprovalStatusLogsTable = () => {
  const { approvedOrRejectedLogs, approvedOrRejectedLogsCount } = useSelector(
    (state: RootState) => state.employee
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  console.log("approvedOrRejectedLogs", approvedOrRejectedLogs);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("de");
    dispatch(getApprovedOrRejectedLogs());
  }, []);

  const getWaitingFor = (log: any) => {
    if (!log.approvals || log.approvals.length === 0) return "-";

    const pending = log.approvals.find((a: any) => a.status === "PENDING");

    if (pending) return pending.approverName || pending.role;

    return "None";
  };

  const getStatusIcon = (log: any) => {
    if (log.approvals.some((a: any) => a.status === "REJECTED"))
      return <CancelIcon color="error" />;

    if (log.approvals.every((a: any) => a.status === "APPROVED"))
      return <CheckCircleIcon color="success" />;

    return <HourglassBottomIcon sx={{ color: "#F5A623" }} />;
  };

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

      case "approvalStatus":
        return getStatusIcon(log);

      case "waitingFor":
        return getWaitingFor(log);

      default:
        return "-";
    }
  };

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            paddingX: 1,
            paddingY: 0.5,
            fontSize: "12px",
            backgroundColor: "#EFE6F6",
            border: "1px solid #d6d6d6ff",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "#e3e3e3ff",
              transform: "scale(1.04)",
            },
          }}
        >
          Count : {approvedOrRejectedLogsCount}
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table >
          <TableHead sx={{ backgroundColor: "#EFE6F6" }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <strong>{col.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {approvedOrRejectedLogs.map((log: any) => (
              <TableRow
                key={log._id}
                onClick={() => {
                  const routeRole = getRouteRole(user?.role);
                  navigate(`/${routeRole}/logDetails/${log._id}`);
                }}
                sx={{
                  height:30,
                  "&:hover": {
                    backgroundColor: "#e3e3e3ff",
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
  );
};

export default ApprovalStatusLogsTable;
