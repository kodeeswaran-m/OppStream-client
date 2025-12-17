import { Box, Grid, Paper, Skeleton, Stack } from "@mui/material";

const LogDetailsChartSkeleton = () => {
  return (
    <Box sx={{ backgroundColor: "#f4f2f5ff", paddingTop: 0.2 }}>
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
        {/* ---------------- PIE CARD ---------------- */}
        <Grid>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            {/* Title */}
            <Skeleton
              animation="wave"
              height={24}
              width={180}
              sx={{ mx: "auto", mb: 2 }}
            />

            {/* Legend */}
            <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
              {[1, 2, 3].map((i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={10} height={10} />
                  <Skeleton width={40} height={12} />
                </Stack>
              ))}
            </Stack>

            {/* Half Pie Skeleton (exact size match) */}
            <Box
              sx={{
                position: "relative",
                width: 380,
                height: 170, // half of 380 ≈ 190, trimmed slightly
                mx: "auto",
                overflow: "hidden",
              }}
            >
              {/* OUTER CIRCLE */}
              <Skeleton
                variant="circular"
                animation="wave"
                sx={{
                  width: 380,
                  height: 380,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />

              {/* INNER CUTOUT (60%) */}
              <Box
                sx={{
                  position: "absolute",
                  width: 228, // 60% of 380
                  height: 228,
                  top: 76, // (380 - 228) / 2
                  left: 76,
                  borderRadius: "50%",
                  bgcolor: "#fff",
                }}
              />
            </Box>
          </Paper>
        </Grid>
        {/* ---------------- ROLE CARDS ---------------- */}
        <Grid
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[1, 2, 3].map((i) => (
            <Grid key={i}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  width: 90,
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Skeleton animation="wave" width={60} height={14} />
                <Skeleton animation="wave" width={30} height={28} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogDetailsChartSkeleton;
