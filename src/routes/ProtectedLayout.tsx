import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Box } from "@mui/material";
import AppBreadcrumbs from "../components/common/AppBreadcrumbs";

interface Props {
  allowedRoles: string[];
}

const ProtectedLayout = ({ allowedRoles }: Props) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  // 🔐 Not logged in
  if (!accessToken) return <Navigate to="/login" replace />;

  const role = user?.role;

  // 🚫 Unauthorized role
  if (!role || !allowedRoles.includes(role))
    return <Navigate to="/unauthorized" replace />;

  return (
    <>
      <Box
        sx={{ backgroundColor: "#f4f2f5ff", paddingTop: 0.2, height: "100vh" }}
      >
        {/* 🧭 Breadcrumbs */}
        <Box sx={{ mt: 8, px: 4 }}>
          <AppBreadcrumbs />
        </Box>
        {/* 📄 Page content */}
        <Outlet />
      </Box>
    </>
  );
};

export default ProtectedLayout;

// import { Outlet, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store";

// interface Props {
//   allowedRoles: string[];
// }

// const ProtectedLayout = ({ allowedRoles }: Props) => {
//   const { accessToken, user } = useSelector((state: RootState) => state.auth);

//   if (!accessToken) return <Navigate to="/login" replace />;

//   const role = user?.role;
//   if (!role || !allowedRoles.includes(role))
//     return <Navigate to="/unauthorized" replace />;

//   return <Outlet />;
// };

// export default ProtectedLayout;
