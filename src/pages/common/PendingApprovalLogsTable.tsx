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
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import { type AnyAction } from "redux";
import { useEffect, useState } from "react";

import {
  getPendingApprovalLogs,
  updateApprovalStatus,
} from "../../store/actions/employeeActions";
import type { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { getRouteRole } from "../../utils/getRouteRole";
import { Scale } from "lucide-react";

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

  // EXTRA COLUMNS
  { label: "Approval Status", key: "approvalStatus" },
  { label: "Action", key: "action" },
];

const PendingApprovalLogsTable = () => {
  const { pendingApprovalLogs, pendingApprovalLogsCount } = useSelector(
    (state: RootState) => state.employee
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  console.log("pendingApprovalLogs", pendingApprovalLogs);
  // Track edited status per row
  const [editedStatus, setEditedStatus] = useState<
    Record<string, "PENDING" | "APPROVED" | "REJECTED">
  >({});

  useEffect(() => {
    dispatch(getPendingApprovalLogs());
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

  // Save handler
  const handleSave = (logId: string) => {
    if (!editedStatus[logId]) return;
    console.log("logID and status", logId, editedStatus[logId]);
    dispatch(updateApprovalStatus(logId, editedStatus[logId])).then((data) => {
      if (data?.success === true) dispatch(getPendingApprovalLogs());
    });
    // remove saved value
    setEditedStatus((prev) => {
      const copy = { ...prev };
      delete copy[logId];
      return copy;
    });
  };

  return (
    <>
      {/* HEADER */}
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
        {/* <Typography variant="h6">Employee Logs</Typography> */}

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
          Count : {pendingApprovalLogsCount}
        </Typography>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table size="small">
          {/* TABLE HEAD */}
          <TableHead sx={{ backgroundColor: "#EFE6F6" }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <strong>{col.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {pendingApprovalLogs.map((log: any) => (
              <TableRow
                key={log._id}
                onClick={() => {
                  const routeRole = getRouteRole(user?.role);
                  navigate(`/${routeRole}/logDetails/${log._id}`);
                }}
                sx={{
                  "&:hover": { backgroundColor: "#e3e3e3ff" },
                }}
              >
                {" "}
                {columns.map((col) => {
                  if (col.key === "approvalStatus") {
                    return (
                      <TableCell key={col.key}>
                        <Select
                          size="small"
                          defaultValue="PENDING"
                          //   value={editedStatus[log._id] ?? log.approvalStatus}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onChange={(e) => {
                            e.stopPropagation();
                            setEditedStatus((prev) => ({
                              ...prev,
                              [log._id]: e.target.value,
                            }));
                          }}
                          sx={{ minWidth: 140 }}
                        >
                          <MenuItem value="PENDING">Pending</MenuItem>
                          <MenuItem value="APPROVED">Approved</MenuItem>
                          <MenuItem value="REJECTED">Rejected</MenuItem>
                        </Select>
                      </TableCell>
                    );
                  }

                  if (col.key === "action") {
                    return (
                      <TableCell key={col.key}>
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(log._id);
                          }}
                          disabled={!editedStatus[log._id]}
                        >
                          <SaveIcon />
                        </IconButton>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={col.key}>
                      {getCellValue(log, col.key)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PendingApprovalLogsTable;
