import { useEffect, useState } from "react";
import { getUserApprovalCounts } from "../../services/logService";

import { Box, Typography, Paper, CircularProgress, Grid } from "@mui/material";

import { PieChart } from "@mui/x-charts";

const LogDetailsChart = () => {
  const [counts, setCounts] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  console.log("counts", counts);
  const [loading, setLoading] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const res = await getUserApprovalCounts();
        console.log("res.counts", res.counts);
        setCounts(res.counts);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const pieData = [
    { id: 0, value: counts.accepted, label: "Accepted", color: "#4CAF50" },
    { id: 1, value: counts.rejected, label: "Rejected", color: "#F44336" },
    { id: 2, value: counts.pending, label: "Pending", color: "#FF9800" },
  ];
  const cards = [
    { name: "accepted", labelName: "Accepted", color: "green" },
    { name: "rejected", labelName: "Rejected", color: "red" },
    { name: "pending", labelName: "Pending", color: "orange" },
  ];

  return (
    <Box
      sx={{ backgroundColor: "#f4f2f5ff", paddingTop: 0.2}}
    >
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "top",
          margin: 4,
          mt: 8,
        }}
      >
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={600} mb={2} sx={{ textAlign: "center" }}>
              Approval Status Overview
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : (
              <PieChart
                key={windowWidth}   // 👈 Important
                height={200}
                margin={{
                  top: -10,
                  bottom: -90,
                }}
                series={[
                  {
                    startAngle: -90,
                    endAngle: 90,
                    paddingAngle: 0.6,
                    innerRadius: "60%",
                    outerRadius: "90%",
                    data: pieData,

                    highlightScope: { fade: "global", highlight: "item" },
                    highlighted: { additionalRadius: 3 },
                    cornerRadius: 4,
                    fade: true,
                    // arcLabel: (item) => `${item.value}`,
                    arcLabelRadius: "70%",
                  },
                ]}
                sx={{
                  "& .MuiPieArc-root": {
                    transition: "all 0.2s ease", // smooth animation
                  },
                }}
                slotProps={{
                  legend: {
                    position: { vertical: "top" },
                    sx: { mt: 6 },
                  },
                }}
              />
            )}
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{ display: "flex", gap: 2, justifyContent: "center" }}
        >
          {cards.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.name}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  width: 90,
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  transition: "all 0.3s ease",
                  cursor: "pointer",

                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    bgcolor: "#f9f9f9",
                  },
                }}
              >
                {" "}
                <Typography fontWeight={600} variant="subtitle2">
                  {item.labelName}
                </Typography>
                <Typography variant="h4" fontWeight={700} color={item.color}>
                  {counts[item.name as keyof typeof counts]}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogDetailsChart;
