import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { routeConfig } from "../../routes/RouteConfig";
import { getBreadcrumbs } from "../../utils/getBreadcrumbs";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const AppBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = useSelector(
    (state: RootState) => state.auth.user?.role
  );

  if (!role || !routeConfig[role]) return null;

  const breadcrumbs = getBreadcrumbs(
    location.pathname,
    routeConfig[role]
  );
console.log("breadcrumbs", breadcrumbs);
  if (breadcrumbs.length <= 1) return null;

  return (
    <Breadcrumbs  sx={{ mb: 2, mt:9 }}>
      {breadcrumbs.map((crumb, index) =>
        index === breadcrumbs.length - 1 ? (
          <Typography
            key={crumb.label}
            color="text.primary"
            fontWeight={600}
          >
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={crumb.label}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(crumb.path)}
          >
            {crumb.label}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
