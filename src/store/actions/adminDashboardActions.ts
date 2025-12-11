import axios from "../../utils/axiosInstance";
import type { Dispatch } from "redux";
import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAIL,
} from "../constants/adminDashboardConstants";

export const getAdminDashboardData = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ADMIN_DASHBOARD_REQUEST });

    const [statsRes, employeesRes, buRes, logsRes] = await Promise.all([
      axios.get("/api/admin/dashboard/stats"),
      axios.get("/api/admin/employees"),
      axios.get("/api/admin/business-units"),
      axios.get("/api/admin/logs"),
    ]);

    dispatch({
      type: ADMIN_DASHBOARD_SUCCESS,
      payload: {
        stats: statsRes.data,
        employees: employeesRes.data.employees,
        businessUnits: buRes.data.businessUnits,
        logs: logsRes.data.logs,
      },
    });
  } catch (error: any) {
    dispatch({
      type: ADMIN_DASHBOARD_FAIL,
      payload: error.response?.data?.message || "Dashboard fetch failed",
    });
  }
};
