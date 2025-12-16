import axios from "../../utils/axiosInstance";
import type { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "../constants/authConstants";

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      return { success: true, data: response.data };
    } catch (error: any) {
      console.log("error", error);
      dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
      return { success: false, data: error?.response.data.message };
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const response = await axios.post("/api/auth/logout");
    dispatch({ type: LOGOUT_SUCCESS, payload: response?.data || "" });
    return { success: true, data: response?.data };
  } catch (error: any) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.response.data.message });
    return { success: false, data: error?.response.data.message };
  }
};

export const signup =
  (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
  ) =>
  async (dispatch: Dispatch) => {
    console.log("signup details", username, email, password);
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
        role,
      });
      console.log("res.payload", response.data);
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      return { success: true, data: response.data };
    } catch (error: any) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.response.data.message });
      return { success: false, data: error?.response.data.message };
    }
  };

export const loadUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });

  try {
    // Call refresh API — cookie (rt) will be automatically sent because withCredentials: true
    const response = await axios.post("/api/auth/refresh");

    // { accessToken, user }
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: response.data,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    dispatch({
      type: LOAD_USER_FAILURE,
      payload: error?.response?.data.message || "Session expired",
    });
    return { success: false, data: error?.response.data.message };
  }
};
