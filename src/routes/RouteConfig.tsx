// routes/RouteConfig.tsx
import type { UserRole, AppRoute } from "./routeTypes";
import EmployeeDashboard from "../pages/employee/Dashboard";
import ReportingManagerDashboard from "../pages/reportingManager/Dashboard";
import VPDashboard from "../pages/VP/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBusinessUnit from "../pages/admin/CreateBusinessUnit";
import EmployeeFormPage from "../pages/EmployeeFormPages";
import LogPage from "../pages/common/LogPage";
import LogTables from "../pages/reportingManager/LogTables";
import UserLogsTable from "../pages/common/UserLogsTable";
import LogDetailsPageWrapper from "../pages/common/LogDetailsPageWrapper";
import CreateUser from "../pages/admin/CreateUser";
import UsersTable from "../pages/admin/UsersTable";
import UpdateUserPage from "../pages/admin/UpdateUserPage";
import EmployeeLogsList from "../pages/common/EmplopyeeLogsList";
import ProfilePage from "../pages/common/ProfilePage";
// routes/RouteConfig.tsx
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import TableChartIcon from "@mui/icons-material/TableChart";
export const routeConfig: Record<UserRole, AppRoute[]> = {
  employee: [
    {
      path: "/employee/dashboard",
      label: "Dashboard",
      element: <EmployeeDashboard />,
      icon: <DashboardIcon fontSize="small" />,
    },
    { path: "/employee/form", element: <EmployeeFormPage /> },
    {
      path: "/employee/viewProfile",
      element: <ProfilePage />,
    },
    {
      path: "/employee/log",
      icon: <DescriptionIcon fontSize="small" />,
      label: "Log",
      element: <LogPage />,
    },
    {
      path: "/employee/logTable",
      label: "Log Table",
      icon: <TableChartIcon fontSize="small" />,
      element: <UserLogsTable />,
    },
  ],

  "reporting manager": [
    {
      path: "/manager/dashboard",
      label: "Dashboard",
      breadcrumb: "Dashboard",
      element: <ReportingManagerDashboard />,
    },
    {
      path: "/manager/viewProfile",
      breadcrumb: "View Profile",
      parentPath: "/manager/dashboard",
      element: <ProfilePage />,
    },
    {
      path: "/manager/form",
      breadcrumb: "Update Profile",
      parentPath: "/manager/viewProfile",
      element: <EmployeeFormPage />,
    },
    {
      path: "/manager/logForm",
      icon: <DescriptionIcon fontSize="small" />,
      label: "Log Form",
      breadcrumb: "Log Form",
      element: <LogPage />,
    },
    {
      path: "/manager/logTables",
      icon: <TableChartIcon fontSize="small" />,
      label: "Table",
      breadcrumb: "Log Tables",
      element: <LogTables />,
    },
    {
      path: "/manager/logDetails/:id",
      // label: "Log Details",
      breadcrumb: "Log Details",
      parentPath: "/manager/logTables",
      element: <LogDetailsPageWrapper />,
    },
    {
      path: "/manager/employee-logs/:id",
      breadcrumb: "Employee Logs",
      element: <EmployeeLogsList />,
    },
  ],

  "associate manager": [
    {
      path: "/associate/dashboard",
      label: "Dashboard",
      element: <VPDashboard />,
      // element: <AssociateManagerDashboard />,
    },
    { path: "/associate/form", element: <EmployeeFormPage /> },
    { path: "/associate/viewProfile", element: <ProfilePage /> },

    { path: "/associate/logForm", label: "Log Form", element: <LogPage /> },
    { path: "/associate/logTables", label: "Table", element: <LogTables /> },
    {
      path: "/associate/logDetails/:id",
      // label: "Log Details",
      element: <LogDetailsPageWrapper />,
    },
    {
      path: "/associate/employee-logs/:id",
      element: <EmployeeLogsList />,
    },
  ],

  VP: [
    { path: "/vp/dashboard", label: "Dashboard", element: <VPDashboard /> },
    { path: "/vp/form", element: <EmployeeFormPage /> },
    { path: "/vp/viewProfile", element: <ProfilePage /> },

    { path: "/vp/logForm", label: "Log Form", element: <LogPage /> },
    { path: "/vp/logTables", label: "Table", element: <LogTables /> },
    {
      path: "/vp/logDetails/:id",
      // label: "Log Details",
      element: <LogDetailsPageWrapper />,
    },
    {
      path: "/vp/employee-logs/:id",
      element: <EmployeeLogsList />,
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
    {
      path: "/admin/createUser",
      label: "Create User",
      element: <CreateUser />,
    },
    {
      path: "/admin/usersTable",
      label: "Users Table",
      element: <UsersTable />,
    },
    {
      path: "/admin/update-user/:userId",
      // label: "Users Table",
      element: <UpdateUserPage />,
    },
  ],
};
