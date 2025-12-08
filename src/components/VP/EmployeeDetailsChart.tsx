import { useEffect, useState } from "react";
import { getEmployeeCounts } from "../../services/logService";

import { Box, Typography, Paper, CircularProgress, Grid } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const EmployeeDetailsChart = () => {
  const [counts, setCounts] = useState({
    total: 0,
    associateManager: 0,
    reportingManager: 0,
    employee: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const res = await getEmployeeCounts();
        setCounts(res.counts);
      } catch (error) {
        console.error("Error fetching employee counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Pie chart data
  const pieData = [
    { id: 0, value: counts.associateManager, label: "AM", color: "#283593" },
    { id: 1, value: counts.reportingManager, label: "RM", color: "#0277BD" },
    { id: 2, value: counts.employee, label: "EMP", color: "#2E7D32" },
  ];

  const roleCards = [
    { name: "total", labelName: "Total", color: "#6A1B9A" },
    { name: "associateManager", labelName: "AM", color: "#283593" },
    { name: "reportingManager", labelName: "RM", color: "#0277BD" },
    { name: "employee", labelName: "Employees", color: "#2E7D32" },
  ];

  return (
    <Box
      sx={{ backgroundColor: "#f4f2f5ff", paddingTop: 0.2, height: "100vh" }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: 6,
          mt: 8,
        }}
      >
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            roleCards.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.name}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    width: 100,
                    height: 90,
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
                  <Typography fontWeight={600} variant="subtitle2">
                    {item.labelName}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{ color: item.color }}
                  >
                    {counts[item.name as keyof typeof counts]}
                  </Typography>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={600} mb={2} sx={{ textAlign: "center" }}>
              Employee Distribution
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : (
              <PieChart
                height={220}
                margin={{ top: -10, bottom: -90 }}
                series={[
                  {
                    startAngle: -90,
                    endAngle: 90,
                    innerRadius: "60%",
                    outerRadius: "90%",
                    paddingAngle: 1,
                    data: pieData,

                    highlightScope: { fade: "global", highlight: "item" },
                    highlighted: { additionalRadius: 4 }, // expands arc
                    cornerRadius: 4, // rounded edges
                    fade: true,

                    // Optional labels (enable if needed)
                    // arcLabel: (item) => `${item.value}`,
                    // arcLabelRadius: "70%",
                  },
                ]}
                sx={{
                  "& .MuiPieArc-root": {
                    transition: "all 0.2s ease", // smooth hover animation
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
      </Grid>
    </Box>
  );
};

export default EmployeeDetailsChart;
