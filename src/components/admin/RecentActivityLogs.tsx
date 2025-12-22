import React from "react";
import { Box, Grid, Paper, Typography, Chip } from "@mui/material";
import { FileText, CheckCircle, Clock, User } from "lucide-react";
 
interface RecentActivityLogsProps {
  logs: any;
  getApprovalCount: (approvalArr: any[]) => number;
}
 
const RecentActivityLogs = ({
  logs,
  getApprovalCount,
}: RecentActivityLogsProps) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <FileText size={20} />
          <Typography variant="h6" fontWeight="bold">
            Recent Activity Logs
          </Typography>
        </Box>
 
        {/* Empty */}
        {logs.length === 0 ? (
          <Typography>No logs available</Typography>
        ) : (
          logs
            .slice()
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((log: any) => (
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: "16px",
                  width: "90%",
                  // width: "100%",
                  "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
                key={log._id}
              >
                {/* Top Row */}
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                  }}
                >
                  {/* Created By + Role */}
                  <Grid item xs={12} sm={8} md={9}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      flexWrap="wrap"
                    >
                      <User size={16} color="#2563eb" />
 
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ wordBreak: "break-word" }}
                      >
                        <strong>Created By:</strong>{" "}
                        {log.createdBy.employeeName || "Unknown"} (
                        {log.createdBy.employeeId || "N/A"}){", "}
                        <strong>Role:</strong> {log.createdBy.role || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
 
                  {/* Requirement Type Chip */}
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    display="flex"
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Chip
                      label={log.requirementType || "N/A"}
                      size="small"
                      sx={{
                        mt: { xs: 1, sm: 0 },
                        background: "#e0e7ff",
                        cursor:"pointer",
                        "&:hover": {
                          transform: "scale(1.1)",
                          backgroundColor:"#bbcbfeff"
                        },
                      }}
                    />
                  </Grid>
                </Grid>
 
                {/* Bottom Row */}
                <Grid container spacing={2} mt={1}>
                  {/* Approvals */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CheckCircle size={16} color="#16a34a" />
                      <Typography color="text.secondary">
                        {getApprovalCount(log.approvals)} Approvals
                      </Typography>
                    </Box>
                  </Grid>
 
                  {/* Created Time */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Clock size={16} color="#ea580c" />
                      <Typography variant="caption">
                        {new Date(log.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))
        )}
      </Paper>
    </Box>
  );
};
 
export default RecentActivityLogs;