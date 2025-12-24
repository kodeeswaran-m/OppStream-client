
import { Box, CircularProgress } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { circularProgressClasses } from "@mui/material/CircularProgress";

// 🔁 Constant rotation animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Wrapper
const LoaderWrapper = styled(Box)(() => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
}));

// Circular loader (constant spin)
const LogoCircularProgress = styled(CircularProgress)(() => ({
  color: "#ffffffff",
  animation: `${rotate} 0.7s linear infinite`,
  [`& .${circularProgressClasses.circle}`]: {
    strokeLinecap: "butt",
    strokeDasharray: "40, 200",
    strokeDashoffset: 0,
  },
}));

// Center logo
const CenterLogo = styled(BubbleChartIcon)(() => ({
  position: "absolute",
  color: "#ffffffff",
}));

// ---------------- COMPONENT ----------------
type LogoLoaderProps = {
  size?: number; // base size
};

export default function LogoLoader({ size = 12 }: LogoLoaderProps) {
  const loaderSize = size * 1.5;

  return (
    <LoaderWrapper>
      <LogoCircularProgress
        variant="indeterminate"
        disableShrink
        size={loaderSize}
        thickness={3}
        // thickness={Math.max(2, size / 4)}
      />
      <CenterLogo sx={{ fontSize: size }} />
    </LoaderWrapper>
  );
}



// import * as React from "react";
// import { Box, CircularProgress } from "@mui/material";
// import { styled, keyframes } from "@mui/material/styles";
// import BubbleChartIcon from "@mui/icons-material/BubbleChart";
// import { circularProgressClasses } from "@mui/material/CircularProgress";

// // 🔁 Constant rotation animation
// const rotate = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// // Wrapper
// const LoaderWrapper = styled(Box)(() => ({
//   position: "relative",
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// // Circular loader (constant spin)
// const LogoCircularProgress = styled(CircularProgress)(() => ({
//   color: "#ffffffff",
//   animation: `${rotate} 0.7s linear infinite`,
//   [`& .${circularProgressClasses.circle}`]: {
//     strokeLinecap: "butt",
//     strokeDasharray: "40, 200", 
//     strokeDashoffset: 0,
//   },
// }));

// // Center logo (static)
// const CenterLogo = styled(BubbleChartIcon)(() => ({
//   position: "absolute",
//   fontSize: 12,
//   color: "#ffffffff",
// }));

// export default function LogoLoader() {
//   return (
//     <LoaderWrapper>
//       <LogoCircularProgress
//         variant="indeterminate"
//         disableShrink
//         size={18}
//         thickness={4}
//       />
//       <CenterLogo />
//     </LoaderWrapper>
//   );
// }
