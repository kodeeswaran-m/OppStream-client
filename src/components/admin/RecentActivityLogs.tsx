import { Box, Grid, Paper, Typography, Chip } from "@mui/material";
import { FileText, CheckCircle, Clock, User } from "lucide-react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface RecentActivityLogsProps {
  logs: any[];
  getApprovalCount: (approvalArr: any[]) => number;
}

const RecentActivityLogs = ({
  logs,
  getApprovalCount,
}: RecentActivityLogsProps) => {
  console.log("lof", logs);
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

        {/* Empty State */}
        {logs.length === 0 ? (
          <Typography>No logs available</Typography>
        ) : (
          <Box
            sx={{
              "& .swiper-button-next, & .swiper-button-prev": {
                width: 20,
                height: 20,
                color: "#475569",
              },
              "& .swiper-button-next::after, & .swiper-button-prev::after": {
                fontSize: "10px",
                fontWeight: "bold",
              },

              "& .swiper-button-next:hover, & .swiper-button-prev:hover": {
                color: "#1d4ed8",
                transform: "scale(1.1)",
              },
            }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1} // mobile default
              autoplay={{
                delay: 2000, // 🔁 every 2 seconds
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 }, // tablet & desktop
              }}
              style={{ paddingBottom: "32px" }}
            >
              {logs
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((log) => (
                  <SwiperSlide key={log._id}>
                    <Paper
                      sx={{
                        p: 2,
                        m: 1,
                        height: "100%",
                        borderRadius: "16px",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      {/* Top Row */}
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {/* Created By */}
                        <Grid>
                          <Box display="flex" gap={1} flexWrap="wrap">
                            <User size={16} color="#2563eb" />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Created By:</strong>{" "}
                              {log.createdBy.employeeName || "Unknown"} (
                              {log.createdBy.employeeId || "N/A"}) •{" "}
                              <strong>{log.createdBy.role || "N/A"}</strong>
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Requirement Type */}
                        <Grid textAlign="right">
                          <Chip
                            label={log.requirementType || "N/A"}
                            size="small"
                            sx={{
                              background: "#e0e7ff",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "#bbcbfe",
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} mt={2}>
                        <Grid>
                          <Box display="flex" alignItems="center" gap={1}>
                            <ApartmentIcon />{" "}
                            <Typography color="text.secondary">
                              opportunity from : {log.oppFrom?.clientName}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid>
                          <Box display="flex" alignItems="center" gap={1}>
                            <AccountTreeIcon/>{" "}
                            <Typography variant="caption">
                              Project Name : {log.oppFrom?.projectName}{" "}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      {/* Bottom Row */}
                      <Grid container spacing={2} mt={2}>
                        <Grid>
                          <Box display="flex" alignItems="center" gap={1}>
                            <CheckCircle size={16} color="#16a34a" />
                            <Typography color="text.secondary">
                              {getApprovalCount(log.approvals)} Approvals
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Clock size={16} color="#ea580c" />
                            <Typography variant="caption">
                              {new Date(log.createdAt).toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RecentActivityLogs;
