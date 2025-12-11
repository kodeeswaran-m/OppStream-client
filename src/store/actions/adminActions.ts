// store/actions/adminActions.ts
import axios from "../../utils/axiosInstance";
import type { Dispatch } from "redux";
import {
  CREATE_BU_REQUEST,
  CREATE_BU_SUCCESS,
  CREATE_BU_FAILURE,
  GET_BU_REQUEST,
  GET_BU_SUCCESS,
  GET_BU_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../constants/adminConstants";

interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  businessUnitId?: string;
  employeeId?: string;
}
export const createBusinessUnit =
  (name: string) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_BU_REQUEST });

    try {
      const res = await axios.post("/api/business-units/create", { name });

      dispatch({ type: CREATE_BU_SUCCESS, payload: res.data });

      return { success: true, data: res.data };
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create BU";

      dispatch({ type: CREATE_BU_FAILURE, payload: message });

      return { success: false, data: message };
    }
  };

export const getBusinessUnits = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_BU_REQUEST });

  try {
    const res = await axios.get("/api/business-units/all");

    dispatch({ type: GET_BU_SUCCESS, payload: res.data.businessUnits });

    return { success: true, data: res.data.businessUnits };
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch BU list";

    dispatch({ type: GET_BU_FAILURE, payload: message });

    return { success: false, data: message };
  }
};

export const createUser =
  (payload: CreateUserPayload) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });

    try {
      const res = await axios.post("/api/business-units/createUser", payload);

      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: res.data,
      });

      return { success: true, data: res.data };
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create user";

      dispatch({
        type: CREATE_USER_FAILURE,
        payload: message,
      });

      return { success: false, data: message };
    }
  };

export const getUsers =
  (filters: {
    role?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });

    try {
      // Build query params, ignoring undefined or 'all'
      const params = new URLSearchParams();

      if (filters.search && filters.search.trim() !== "") {
        params.append("search", filters.search);
      }

      if (filters.role && filters.role !== "all") {
        params.append("role", filters.role);
      }

      params.append("page", String(filters.page || 1));
      params.append("limit", String(filters.limit || 10));
      console.log("params", params);
      const res = await axios.get(
        `/api/business-units/getAllUsers?${params.toString()}`
      );

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users: res.data.users,
          total: res.data.total,
          page: res.data.page,
          limit: res.data.limit,
        },
      });

      return { success: true, data: res.data.users };
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch users";

      dispatch({
        type: GET_USERS_FAILURE,
        payload: message,
      });

      return { success: false, data: message };
    }
  };

