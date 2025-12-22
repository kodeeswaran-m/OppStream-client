import axios from "../../utils/axiosInstance";
import type { Dispatch } from "redux";
import {
  UPSERT_EMP_REQUEST,
  UPSERT_EMP_SUCCESS,
  UPSERT_EMP_FAILURE,
  GET_EMP_REQUEST,
  GET_EMP_SUCCESS,
  GET_EMP_FAILURE,
  GET_SINGLE_EMP_REQUEST,
  GET_SINGLE_EMP_SUCCESS,
  GET_SINGLE_EMP_FAILURE,
  GET_MANAGERS_REQUEST,
  GET_MANAGERS_SUCCESS,
  GET_MANAGERS_FAILURE,
  GET_CURRENT_EMP_REQUEST,
  GET_CURRENT_EMP_SUCCESS,
  GET_CURRENT_EMP_FAILURE,
  CREATE_EMP_LOG_REQUEST,
  CREATE_EMP_LOG_SUCCESS,
  CREATE_EMP_LOG_FAILURE,
  GET_VISIBLE_LOGS_REQUEST,
  GET_VISIBLE_LOGS_SUCCESS,
  GET_VISIBLE_LOGS_FAILURE,
  GET_REPORTING_EMPLOYEE_LOGS_REQUEST,
  GET_REPORTING_EMPLOYEE_LOGS_SUCCESS,
  GET_REPORTING_EMPLOYEE_LOGS_FAILURE,
  UPDATE_APPROVAL_STATUS_REQUEST,
  UPDATE_APPROVAL_STATUS_SUCCESS,
  UPDATE_APPROVAL_STATUS_FAILURE,
  GET_PENDING_APPROVAL_LOGS_REQUEST,
  GET_PENDING_APPROVAL_LOGS_SUCCESS,
  GET_PENDING_APPROVAL_LOGS_FAILURE,
  GET_APPROVED_OR_REJECTED_LOGS_REQUEST,
  GET_APPROVED_OR_REJECTED_LOGS_SUCCESS,
  GET_APPROVED_OR_REJECTED_LOGS_FAILURE,
} from "../constants/employeeConstants";

/* ----------------------------------------------------
   EMPLOYEE CRUD
---------------------------------------------------- */

export const upsertEmployee = (formData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: UPSERT_EMP_REQUEST });

  try {
    const res = await axios.post("/api/employee/upsert", formData);

    dispatch({
      type: UPSERT_EMP_SUCCESS,
      payload: res.data,
    });

    return { success: true, data: res.data };
  } catch (error: any) {
    dispatch({
      type: UPSERT_EMP_FAILURE,
      payload: error.response?.data?.message || "Failed to save employee details",
    });

    return { success: false };
  }
};

export const getEmployees = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_EMP_REQUEST });

  try {
    const res = await axios.get("/api/employee/getEmpByRole");

    dispatch({
      type: GET_EMP_SUCCESS,
      payload: res.data.employees,
    });

    return { success: true, data: res.data.employees };
  } catch (error: any) {
    dispatch({
      type: GET_EMP_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch employees",
    });

    return { success: false };
  }
};

export const getManagersList = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_MANAGERS_REQUEST });

  try {
    const res = await axios.get("/api/employee/getManagers");

    dispatch({
      type: GET_MANAGERS_SUCCESS,
      payload: res.data.managers,
    });

    return { success: true, data: res.data.managers };
  } catch (error: any) {
    dispatch({
      type: GET_MANAGERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch managers",
    });

    return { success: false };
  }
};

export const getCurrentEmployee = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_CURRENT_EMP_REQUEST });

  try {
    const res = await axios.get("/api/employee/getEmployeeByUserId");

    dispatch({
      type: GET_CURRENT_EMP_SUCCESS,
      payload: res.data.employee,
    });

    return { success: true, data: res.data.employee };
  } catch (error: any) {
    dispatch({
      type: GET_CURRENT_EMP_FAILURE,
      payload: error.response?.data?.message || "Failed to load employee",
    });

    return { success: false };
  }
};

/* ----------------------------------------------------
   LOGS
---------------------------------------------------- */

export const createUserLog = (payload: any) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_EMP_LOG_REQUEST });

  try {
    const res = await axios.post("/api/employee/createLog", payload);

    dispatch({
      type: CREATE_EMP_LOG_SUCCESS,
      payload: res.data,
    });

    return { success: true, data: res.data.log };
  } catch (error: any) {
    dispatch({
      type: CREATE_EMP_LOG_FAILURE,
      payload: error.response?.data?.message || "Failed to create log",
    });

    return { success: false };
  }
};

export const getVisibleLogs = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_VISIBLE_LOGS_REQUEST });

  try {
    const res = await axios.get("/api/employee/getVisibleLogs");

    dispatch({
      type: GET_VISIBLE_LOGS_SUCCESS,
      payload: res.data,
    });

    return { success: true };
  } catch (error: any) {
    dispatch({
      type: GET_VISIBLE_LOGS_FAILURE,
      payload: error.response?.data?.message || "Failed to load logs",
    });

    return { success: false };
  }
};

export const getReportingEmployeeLogs = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_REPORTING_EMPLOYEE_LOGS_REQUEST });

  try {
    const res = await axios.get("/api/employee/getReportingEmployeeLogs");

    dispatch({
      type: GET_REPORTING_EMPLOYEE_LOGS_SUCCESS,
      payload: res.data,
    });

    return { success: true };
  } catch (error: any) {
    dispatch({
      type: GET_REPORTING_EMPLOYEE_LOGS_FAILURE,
      payload: error.response?.data?.message || "Failed to load logs",
    });

    return { success: false };
  }
};

/* ----------------------------------------------------
   ✅ APPROVE / REJECT (UPDATED)
---------------------------------------------------- */

export const approveLog =
  (
    logId: string,
    approvalStatus: "APPROVED" | "REJECTED",
    rejectionReason?: string
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_APPROVAL_STATUS_REQUEST });

    try {
      const payload: any = { approvalStatus };

      if (approvalStatus === "REJECTED") {
        payload.rejectionReason = rejectionReason;
      }

      const res = await axios.post(
        `/api/employee/${logId}/approve`,
        payload
      );

      dispatch({
        type: UPDATE_APPROVAL_STATUS_SUCCESS,
        payload: res.data,
      });

      return { success: true };
    } catch (error: any) {
      dispatch({
        type: UPDATE_APPROVAL_STATUS_FAILURE,
        payload:
          error.response?.data?.message || "Approval action failed",
      });

      return { success: false };
    }
  };

/* ----------------------------------------------------
   APPROVAL LISTS
---------------------------------------------------- */

export const getPendingApprovalLogs = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_PENDING_APPROVAL_LOGS_REQUEST });

  try {
    const res = await axios.get("/api/employee/getPendingApprovalLogs");

    dispatch({
      type: GET_PENDING_APPROVAL_LOGS_SUCCESS,
      payload: res.data,
    });

    return { success: true };
  } catch (error: any) {
    dispatch({
      type: GET_PENDING_APPROVAL_LOGS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch logs",
    });

    return { success: false };
  }
};

export const getApprovedOrRejectedLogs = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_APPROVED_OR_REJECTED_LOGS_REQUEST });

  try {
    const res = await axios.get("/api/employee/getApprovedOrRejectedLogs");

    dispatch({
      type: GET_APPROVED_OR_REJECTED_LOGS_SUCCESS,
      payload: res.data,
    });

    return { success: true };
  } catch (error: any) {
    dispatch({
      type: GET_APPROVED_OR_REJECTED_LOGS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch logs",
    });

    return { success: false };
  }
};

export const updateApprovalStatus =
  (
    logId: string,
    payload: {
      approvalStatus: "APPROVED" | "REJECTED" | "PENDING";
      rejectionReason?: string;
    }
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_APPROVAL_STATUS_REQUEST });

    try {
      const res = await axios.post(
        `/api/employee/${logId}/approval`,
        payload
      );

      dispatch({
        type: UPDATE_APPROVAL_STATUS_SUCCESS,
        payload: res.data,
      });

      return { success: true, data: res.data };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Failed to update approval status";

      dispatch({
        type: UPDATE_APPROVAL_STATUS_FAILURE,
        payload: message,
      });

      return { success: false, data: message };
    }
  };

