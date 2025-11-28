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
} from "../constants/adminConstants";
// import type { RootState } from "../../store";

export const createBusinessUnit =
  (name: string) =>
  async (dispatch: Dispatch) => {
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




// // ---------- CREATE BUSINESS UNIT ----------
// export const createBusinessUnit =
//   (name: string) =>
//   async (dispatch: Dispatch, getState: () => RootState) => {
//     dispatch({ type: CREATE_BU_REQUEST });

//     try {
//       const { accessToken } = getState().auth;

//       const res = await axios.post(
//         "/api/business-units/create",
//         { name },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       dispatch({ type: CREATE_BU_SUCCESS, payload: res.data });

//       return { success: true, data: res.data };
//     } catch (error: any) {
//       const message = error.response?.data?.message || "Failed to create BU";

//       dispatch({ type: CREATE_BU_FAILURE, payload: message });

//       return { success: false, data: message };
//     }
//   };

// // ---------- GET ALL BUSINESS UNITS ----------
// export const getBusinessUnits =
//   () => async (dispatch: Dispatch, getState: () => RootState) => {
//     dispatch({ type: GET_BU_REQUEST });

//     try {
//       const { accessToken } = getState().auth;

//       const res = await axios.get("/api/business-units/all", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       dispatch({ type: GET_BU_SUCCESS, payload: res.data.businessUnits });

//       return { success: true, data: res.data.businessUnits };
//     } catch (error: any) {
//       const message = error.response?.data?.message || "Failed to fetch BU list";

//       dispatch({ type: GET_BU_FAILURE, payload: message });

//       return { success: false, data: message };
//     }
//   };
