import React, { useEffect, useState } from "react";
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
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";
import { useNavigate } from "react-router-dom";

import {
  getPendingApprovalLogs,
  updateApprovalStatus,
} from "../../store/actions/employeeActions";
import type { RootState } from "../../store";
import { getRouteRole } from "../../utils/getRouteRole";
import TableSkeleton from "../../components/common/TableSkeleton";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

// Styled Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const columns = [
  { label: "Employee ID", key: "employeeId" },
  { label: "Employee Name", key: "employeeName" },
  { label: "Role", key: "role" },
  { label: "Requirement Type", key: "requirementType" },
  { label: "Project Name", key: "projectName" },
  { label: "Client Name", key: "clientName" },
  { label: "Urgency", key: "urgency" },
  { label: "Expected Start Date", key: "expectedStart" },
  { label: "Approval Status", key: "approvalStatus" },
  { label: "Action", key: "action" },
];

const PendingApprovalLogsTable = () => {
  const { loading, pendingApprovalLogs, pendingApprovalLogsCount } =
    useSelector((state: RootState) => state.employee);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [editedStatus, setEditedStatus] = useState<Record<string, ApprovalStatus>>({});
  const [rejectionReason, setRejectionReason] = useState<Record<string, string>>({});
  const [openModal, setOpenModal] = useState(false);
  const [currentLogId, setCurrentLogId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getPendingApprovalLogs());
  }, [dispatch]);

  const handleOpenModal = (logId: string) => {
    setCurrentLogId(logId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentLogId(null);
    setOpenModal(false);
  };

  const handleSave = (logId: string) => {
    const approvalStatus = editedStatus[logId];
    if (!approvalStatus) return;

    const payload: { approvalStatus: ApprovalStatus; rejectionReason?: string } = {
      approvalStatus,
    };

    if (approvalStatus === "REJECTED") {
      if (!rejectionReason[logId]?.trim()) {
        alert("Please enter rejection reason");
        return;
      }
      payload.rejectionReason = rejectionReason[logId];
    }

    dispatch(updateApprovalStatus(logId, payload)).then((res) => {
      if (res?.success) {
        dispatch(getPendingApprovalLogs());
        setEditedStatus({});
        setRejectionReason({});
        handleCloseModal();
      }
    });
  };

  const getCellValue = (log: any, key: string) => {
    switch (key) {
      case "employeeId":
        return log.createdBy?.employeeId || "-";
      case "employeeName":
        return log.createdBy?.employeeName || "-";
      case "role":
        return log.createdBy?.role || "-";
      case "requirementType":
        return log.requirementType || "-";
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

  if (loading) return <TableSkeleton rows={6} columns={columns.length} />;

  return pendingApprovalLogs.length ? (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
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

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table size="small">
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
            {pendingApprovalLogs.map((log: any) => {
              const currentStatus = editedStatus[log._id] ?? "PENDING";


              return (
                <TableRow
                  key={log._id}
                  hover
                  onClick={() =>
                    navigate(
                      `/${getRouteRole(user?.role)}/logDetails/${log._id}`
                    )
                  }
                >
                  {columns.map((col) => {
                    if (col.key === "approvalStatus") {
                      return (
                        <TableCell key={col.key}>
                          <Select
                            size="small"
                            value={currentStatus}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const value = e.target.value as ApprovalStatus;
                              setEditedStatus({ ...editedStatus, [log._id]: value });

                              if (value === "REJECTED") handleOpenModal(log._id);
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
                            disabled={
                              !editedStatus[log._id] ||
                              (editedStatus[log._id] === "REJECTED" &&
                                !rejectionReason[log._id]?.trim())
                            }
                          >
                            <SaveIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={col.key}>{getCellValue(log, col.key)}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Rejection Modal */}
      <BootstrapDialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Rejection Reason
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ minHeight: 200 }}>
          <TextField
            autoFocus
            label="Reason for rejection"
            fullWidth
            multiline
            rows={6}
            value={currentLogId ? rejectionReason[currentLogId] || "" : ""}
            onChange={(e) =>
              setRejectionReason({
                ...rejectionReason,
                [currentLogId!]: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              currentLogId && handleSave(currentLogId)
            }
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  ) : (
    <Typography textAlign="center" sx={{ mt: 3 }}>
      No logs found.
    </Typography>
  );
};

export default PendingApprovalLogsTable;
