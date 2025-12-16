import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import {
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";

interface RecentActivityLogsProps{
    logs:any,
    getApprovalCount:(approvalArr: any[])=>number;
}
const RecentActivityLogs = ({logs, getApprovalCount}:RecentActivityLogsProps) => {
  return (
         <Box sx={{ mt: 5 }}>
        <Paper sx={{ p: 3, borderRadius: "20px" }}>
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <FileText size={20} />
            <Typography variant="h6" fontWeight="bold">
              Recent Activity Logs
            </Typography>
          </Box>

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
                <Paper sx={{ p: 2, mb: 2, borderRadius: "16px" }} key={log._id}>
                  <Chip
                    label={log.requirementType || "N/A"}
                    size="small"
                    sx={{ mb: 1, background: "#e0e7ff" }}
                  />

                  <Grid container spacing={2}>
                    <Grid >
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle size={16} color="#16a34a" />
                        <Typography color="text.secondary">
                          {getApprovalCount(log.approvals)} Approvals
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid >
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
  )
}

export default RecentActivityLogs