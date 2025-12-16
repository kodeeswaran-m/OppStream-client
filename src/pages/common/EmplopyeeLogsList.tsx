// pages/admin/EmployeeLogsList.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import { getLogsByEmployeeId } from "../../services/logService";

const EmployeeLogsList = () => {
  const { id } = useParams<{ id: string }>();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("pp", logs);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getLogsByEmployeeId(id!);
        setLogs(res.logs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [id]);

  // ---------------- Loading State ----------------
  if (loading) {
    return (
      <Box p={4} mt={5}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i}>
              <Card
                sx={{
                  height: "30vh",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // ---------------- Empty State ----------------
  if (logs.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">No logs found</Typography>
      </Box>
    );
  }

  const employee = logs[0]?.createdBy;

  return (
    <Box p={4} mt={5}>
      {/* ---------- Header ---------- */}
      <Typography variant="h5" fontWeight={600} mb={1}>
        Employee Logs
      </Typography>

      <Typography color="text.secondary" mb={3}>
        {employee?.employeeName} ({employee?.employeeId}) •{" "}
        {employee?.department} • {employee?.team}
      </Typography>

      {/* ---------- Logs List ---------- */}
      <Grid container spacing={3}>
        {logs.length === 0 ? (
          <Typography>no logs found.</Typography>
        ) : (
          logs.map((log) => (
            <Grid>
              <Card
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  {/* -------- Project Info -------- */}
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography fontWeight={600}>
                      {log.oppFrom.projectName}
                    </Typography>

                    <Box>
                      <Chip
                        label={log.requirementType}
                        size="small"
                        sx={{ mr: 1, fontWeight: 900 }}
                      />
                      <Chip
                        label={log.oppFrom.urgency}
                        size="small"
                        color="warning"
                      />
                    </Box>
                  </Box>

                  <Typography fontSize={14} color="text.secondary" mb={2}>
                    Client: {log.oppFrom.clientName} | Project Code:{" "}
                    {log.oppFrom.projectCode}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* -------- Requirement Details -------- */}
                  <Typography fontWeight={500} mb={0.5}>
                    Requirement
                  </Typography>

                  <Typography fontSize={14} mb={1}>
                    {log.oppTo.shortDescription}
                  </Typography>

                  <Typography fontSize={13} color="text.secondary">
                    {log.oppTo.detailedNotes}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* -------- Timeline -------- */}
                  <Grid container spacing={2}>
                    <Grid>
                      <Typography fontSize={13} color="text.secondary">
                        Expected Start
                      </Typography>
                      <Typography fontWeight={500}>
                        {new Date(
                          log.timeline.expectedStart
                        ).toLocaleDateString()}
                      </Typography>
                    </Grid>

                    <Grid>
                      <Typography fontSize={13} color="text.secondary">
                        Expected End
                      </Typography>
                      <Typography fontWeight={500}>
                        {new Date(
                          log.timeline.expectedEnd
                        ).toLocaleDateString()}
                      </Typography>
                    </Grid>

                    <Grid>
                      <Typography fontSize={13} color="text.secondary">
                        Total Persons
                      </Typography>
                      <Typography fontWeight={500}>
                        {log.oppTo.totalPersons}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  {/* -------- Footer -------- */}
                  <Typography fontSize={12} color="text.secondary">
                    Created on {new Date(log.createdAt).toLocaleDateString()} •{" "}
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default EmployeeLogsList;
