// routes/RouteConfig.tsx
import type { UserRole, AppRoute } from "./routeTypes";
import EmployeeDashboard from "../pages/employee/Dashboard";
import ReportingManagerDashboard from "../pages/reportingManager/Dashboard";
import AssociateManagerDashboard from "../pages/associateManager/Dashboard";
import VPDashboard from "../pages/VP/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBusinessUnit from "../pages/admin/CreateBusinessUnit";

export const routeConfig: Record<UserRole, AppRoute[]> = {
  employee: [
    { path: "/employee/dashboard", label: "Dashboard", element: <EmployeeDashboard /> },
  ],

  "reporting manager": [
    { path: "/manager/dashboard", label: "Dashboard", element: <ReportingManagerDashboard /> },
  ],

  "associate manager": [
    { path: "/associate/dashboard", label: "Dashboard", element: <AssociateManagerDashboard /> },
  ],

  VP: [
    { path: "/vp/dashboard", label: "Dashboard", element: <VPDashboard /> },
  ],

  admin: [
    { path: "/admin/dashboard", label: "Dashboard", element: <AdminDashboard /> },
    { path: "/admin/createBU", label: "Create BU", element: <CreateBusinessUnit /> },
  ],
};

