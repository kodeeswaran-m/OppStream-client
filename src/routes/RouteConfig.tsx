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

export const routeConfig: Record<UserRole, AppRoute[]> = {
  employee: [
    {
      path: "/employee/dashboard",
      label: "Dashboard",
      element: <EmployeeDashboard />,
    },
    { path: "/employee/form", element: <EmployeeFormPage /> },
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
      path: "/manager/form",

      element: <EmployeeFormPage />,
    },
    { path: "/manager/logForm", label: "Log Form", element: <LogPage /> },
    { path: "/manager/logTables", label: "Table", element: <LogTables /> },
    {
      path: "/manager/logDetails/:id",
      // label: "Log Details",
      element: <LogDetailsPageWrapper />,
    },
         {
    path: "/manager/employee-logs/:id",
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
