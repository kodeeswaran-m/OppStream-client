// routes/RouteConfig.tsx
import type { UserRole, AppRoute } from "./routeTypes";
import EmployeeDashboard from "../pages/employee/Dashboard";
import ReportingManagerDashboard from "../pages/reportingManager/Dashboard";
import AssociateManagerDashboard from "../pages/associateManager/Dashboard";
import VPDashboard from "../pages/VP/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBusinessUnit from "../pages/admin/CreateBusinessUnit";
import EmployeeFormPage from "../pages/EmployeeFormPages";
import LogPage from "../pages/common/LogPage";
import LogTables from "../pages/reportingManager/LogTables";
import UserLogsTable from "../pages/common/UserLogsTable";
import LogDetailsPageWrapper from "../pages/common/LogDetailsPageWrapper";

export const routeConfig: Record<UserRole, AppRoute[]> = {
  employee: [
    {
      path: "/employee/dashboard",
      label: "Dashboard",
      element: <EmployeeDashboard />,
    },
    { path: "/employee/form", label: "Form", element: <EmployeeFormPage /> },
    { path: "/employee/log", label: "Log", element: <LogPage /> },
    {
      path: "/employee/logTable",
      label: "Log Table",
      element: <UserLogsTable />,
    },
  ],

  "reporting manager": [
    {
      path: "/manager/dashboard",
      label: "Dashboard",
      element: <ReportingManagerDashboard />,
    },
    {
      path: "/manager/profileForm",
      label: "Form",
      element: <EmployeeFormPage />,
    },
    { path: "/manager/logForm", label: "Log Form", element: <LogPage /> },
    { path: "/manager/logTables", label: "Table", element: <LogTables /> },
    {
      path: "/manager/logDetails/:id",
      // label: "Log Details",
      element: <LogDetailsPageWrapper />,
    },
  ],

  "associate manager": [
    {
      path: "/associate/dashboard",
      label: "Dashboard",
      element: <AssociateManagerDashboard />,
    },
    { path: "/associate/form", label: "Form", element: <EmployeeFormPage /> },
    { path: "/associate/logForm", label: "Log Form", element: <LogPage /> },
    { path: "/associate/logTables", label: "Table", element: <LogTables /> },
    {
      path: "/associate/logDetails/:id",
      // label: "Log Details",
      element: <LogDetailsPageWrapper />,
    },
  ],

  VP: [
    { path: "/vp/dashboard", label: "Dashboard", element: <VPDashboard /> },
    { path: "/vp/form", label: "Form", element: <EmployeeFormPage /> },
    { path: "/vp/logForm", label: "Log Form", element: <LogPage /> },
    { path: "/vp/logTables", label: "Table", element: <LogTables /> },
    {
      path: "/vp/logDetails/:id",
      // label: "Log Details",
      element: <LogDetailsPageWrapper />,
    },
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
