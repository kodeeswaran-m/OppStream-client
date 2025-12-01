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
} from "../constants/employeeConstants";


// ---------- CREATE OR UPDATE EMPLOYEE ----------
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
    const message =
      error.response?.data?.message || "Failed to save employee details";

    dispatch({
      type: UPSERT_EMP_FAILURE,
      payload: message,
    });

    return { success: false, data: message };
  }
};

// ---------- GET ALL EMPLOYEES ----------
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
    const message =
      error.response?.data?.message || "Failed to fetch employees";

    dispatch({
      type: GET_EMP_FAILURE,
      payload: message,
    });

    return { success: false, data: message };
  }
};

// ---------- GET SINGLE EMPLOYEE ----------
export const getEmployeeById = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_SINGLE_EMP_REQUEST });

  try {
    const res = await axios.get(`/api/employees/${id}`);

    dispatch({
      type: GET_SINGLE_EMP_SUCCESS,
      payload: res.data.employee,
    });

    return { success: true, data: res.data.employee };
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch employee";

    dispatch({
      type: GET_SINGLE_EMP_FAILURE,
      payload: message,
    });

    return { success: false, data: message };
  }
};

// -------------------- GET MANAGERS LIST --------------------
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
    const message = error.response?.data?.message || "Failed to fetch managers";

    dispatch({
      type: GET_MANAGERS_FAILURE,
      payload: message,
    });

    return { success: false, data: message };
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
    const message =
      error.response?.data?.message || "Failed to load employee details";

    dispatch({
      type: GET_CURRENT_EMP_FAILURE,
      payload: message,
    });

    return { success: false, data: message };
  }
};
