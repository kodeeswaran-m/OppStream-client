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
import { useEffect } from "react";
import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";

import { getVisibleLogs } from "../../store/actions/employeeActions";
import type { RootState } from "../../store";
import TableSkeleton from "../../components/common/TableSkeleton";

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const columns = [
  { label: "Requirement Type", key: "requirementType" },
  { label: "Project Name", key: "projectName" },
  { label: "Client Name", key: "clientName" },
  { label: "Project Code", key: "projectCode" },
  { label: "Priority Level", key: "urgency" },
  { label: "Expected Start Date", key: "expectedStart" },
  { label: "Expected End Date", key: "expectedEnd" },
];

const UserLogsTable = () => {
  const { loading, userLogs, userLogscount } = useSelector(
    (state: RootState) => state.employee
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getVisibleLogs());
  }, [dispatch]);

  // Helper to resolve cell values
  const getCellValue = (log: any, key: string) => {
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

      default:
        return "-";
    }
  };

  if (loading) {
    return <TableSkeleton rows={6} columns={columns.length} />;
  }

  return (
    <>
      {userLogs.length > 0 ? (
        <>
          {/* Header / Count */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              py: 1,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                px: 1.5,
                py: 0.6,
                backgroundColor: "#F2F2F2",
                border: "1px solid #d6d6d6",
                borderRadius: "6px",
              }}
            >
              Count: {userLogscount}
            </Typography>
          </Box>

          {/* Table */}
          <TableContainer
            component={Paper}
            sx={{
              px:1.5,
              width: "98%",
              mt: 1,
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
              overflowX: "auto",
            }}
          >
            <Table>
              {/* Table Head */}
              <TableHead
                sx={{
                  
                  backgroundColor: "#EFE6F6",
                  "& .MuiTableCell-root": {
                    px:1.5,
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    color: "#333",
                    py: 1.5,
                    borderBottom: "1px solid #ddd",
                  },
                }}
              >
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.key}>{col.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {userLogs.map((log) => (
                  <TableRow
                    key={log._id}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f1f1f1",
                        height:"100%",
                      },
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        sx={{
                          fontSize: "1.35rem",
                          
                          py: 1.4,
                          color: "#444",
                          borderBottom: "1px solid #eee",
                          whiteSpace: "nowrap",
                        }}
                      >
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
        <Typography
          sx={{
            textAlign: "center",
            mt: 4,
            fontSize: "1.4rem",
            color: "#777",
          }}
        >
          No logs found.
        </Typography>
      )}
    </>
  );
};

export default UserLogsTable;
