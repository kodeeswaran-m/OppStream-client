// routes/RouteConfig.tsx
import type { UserRole, AppRoute } from "./routeTypes";
import EmployeeDashboard from "../pages/employee/Dashboard";
import ReportingManagerDashboard from "../pages/reportingManager/Dashboard";
import AssociateManagerDashboard from "../pages/associateManager/Dashboard";
import VPDashboard from "../pages/VP/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBusinessUnit from "../pages/admin/CreateBusinessUnit";
import EmployeeFormPage from "../pages/EmployeeFormPages";
import LogPage from "../pages/employee/LogPage";

export const routeConfig: Record<UserRole, AppRoute[]> = {
  employee: [
    {
      path: "/employee/dashboard",
      label: "Dashboard",
      element: <EmployeeDashboard />,
    },
    { path: "/employee/form", label: "Form", element: <EmployeeFormPage /> },
    { path: "/employee/log", label: "Log", element: <LogPage /> },
  ],

  "reporting manager": [
    {
      path: "/manager/dashboard",
      label: "Dashboard",
      element: <ReportingManagerDashboard />,
    },
    { path: "/manager/form", label: "Form", element: <EmployeeFormPage /> },
  ],

  "associate manager": [
    {
      path: "/associate/dashboard",
      label: "Dashboard",
      element: <AssociateManagerDashboard />,
    },
    { path: "/associate/form", label: "Form", element: <EmployeeFormPage /> },
  ],

  VP: [
    { path: "/vp/dashboard", label: "Dashboard", element: <VPDashboard /> },
    { path: "/vp/form", label: "Form", element: <EmployeeFormPage /> },
  ],

  admin: [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/createBU",
      label: "Create BU",
      element: <CreateBusinessUnit />,
    },
  ],
};
