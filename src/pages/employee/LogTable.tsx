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
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";
import { useEffect } from "react";
import { getVisibleLogs } from "../../store/actions/employeeActions";
import type { RootState } from "../../store";
import TableSkeleton from "../../components/common/TableSkeleton";
import { useNavigate } from "react-router-dom";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const columns = [
  { label: "Requirement Type", key: "requirementType" },
  { label: "Project Name", key: "projectName" },
  { label: "Client Name", key: "clientName" },
  { label: "Project Code", key: "projectCode" },
  { label: "Urgency", key: "urgency" },
  { label: "Expected Start Date", key: "expectedStart" },
  { label: "Expected End Date", key: "expectedEnd" },
  { label: "Status", key: "status" },
  { label: "Edit", key: "edit" },
];

const LogTable = () => {
  const { loading, userLogs, userLogscount } = useSelector(
    (state: RootState) => state.employee
  );

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVisibleLogs());
  }, [dispatch]);

  /* -------------------- HELPERS -------------------- */

  const getFinalApproval = (approvals: any[] = []) => {
    const rejected = approvals.find((a) => a.status === "REJECTED");
    if (rejected) {
      return {
        status: "REJECTED",
        rejectedBy: `${rejected.role} (${rejected.approverName || "Unknown"})`,
      };
    }

    if (approvals.some((a) => a.status === "PENDING")) {
      return { status: "PENDING" };
    }

    return { status: "APPROVED" };
  };

  const handleEdit = (log: any) => {
    navigate(`/employee/logs/edit/${log._id}`);
  };

  const getCellValue = (log: any, key: string) => {
    const approval = getFinalApproval(log.approvals);

    switch (key) {
      case "requirementType":
        return log.requirementType || "-";

      case "projectName":
        return log.oppFrom?.projectName || "-";

      case "clientName":
        return log.oppFrom?.clientName || "-";

      case "projectCode":
        return log.oppFrom?.projectCode || "-";

      case "urgency":
        return log.oppFrom?.urgency || "-";

      case "expectedStart":
        return log.timeline?.expectedStart
          ? new Date(log.timeline.expectedStart).toLocaleDateString()
          : "-";

      case "expectedEnd":
        return log.timeline?.expectedEnd
          ? new Date(log.timeline.expectedEnd).toLocaleDateString()
          : "-";

      case "status":
        return (
          <Tooltip
            title={
              approval.status === "REJECTED" ? (
                <>
                  Rejected by {approval.rejectedBy}
                  <br />
                  {/* Remarks: {approval.rejectedBy} */}
                  Remarks: {approval?.rejectionReason??"no reason"}
                </>
              ) : (
                approval.status
              )
            }
          >
            <Chip
              label={approval.status}
              size="small"
              color={
                approval.status === "REJECTED"
                  ? "error"
                  : approval.status === "APPROVED"
                  ? "success"
                  : "warning"
              }
              sx={{ fontWeight: 600 }}
            />
          </Tooltip>
        );

      case "edit":
        return (
          <Tooltip
            title={
              approval.status === "REJECTED"
                ? "Edit Log"
                : "Editing allowed only if rejected"
            }
          >
            <span>
              <IconButton
                size="small"
                disabled={approval.status !== "REJECTED"}
                onClick={() => handleEdit(log)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        );

      default:
        return "-";
    }
  };

  /* -------------------- UI -------------------- */

  if (loading) {
    return <TableSkeleton rows={6} columns={columns.length} />;
  }

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 3 }, py: 2 }}>
      {userLogs.length !== 0 ? (
        <>
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography fontSize="16px" fontWeight={600}>
              Logs
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                px: 1.5,
                py: 0.5,
                border: "1px solid #d6d6d6",
                borderRadius: "6px",
              }}
            >
              Count : {userLogscount}
            </Typography>
          </Box>

          {/* TABLE */}
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table stickyHeader sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      sx={{
                        backgroundColor: "#EFE6F6",
                        fontWeight: 600,
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {userLogs.map((log) => {
                  const approval = getFinalApproval(log.approvals);
                  const isApproved = approval.status === "APPROVED";

                  return (
                    <TableRow
                      key={log._id}
                      hover={!isApproved}
                      sx={{
                        cursor: isApproved ? "not-allowed" : "pointer",
                        opacity: isApproved ? 0.6 : 1,
                        "& td": {
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      {columns.map((col) => (
                        <TableCell key={col.key}>
                          {getCellValue(log, col.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography textAlign="center" mt={4}>
          No logs found.
        </Typography>
      )}
    </Box>
  );
};

export default LogTable;
