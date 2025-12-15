
import { Box, Skeleton, useMediaQuery } from "@mui/material";

const PieChartSkeleton = () => {
  // Dynamically adjust size based on screen width
  const isMobile = useMediaQuery("(max-width:600px)");
  const size = isMobile ? 200 : 300; // Pie container size
  // const radius = size / 2 - 10;      // Radius for inner skeleton arc

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={3}
    >
      <Box
        sx={{
          width: size,
          height: size,
          position: "relative",
        }}
      >
        {/* Background circle */}
        <Skeleton
          variant="circular"
          width={size}
          height={size}
          sx={{ opacity: 0.4 }}
        />
      </Box>
    </Box>
  );
};

export default PieChartSkeleton;
