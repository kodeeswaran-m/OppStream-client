// store/reducers/adminReducer.ts

import {
  CREATE_BU_REQUEST,
  CREATE_BU_SUCCESS,
  CREATE_BU_FAILURE,
  GET_BU_REQUEST,
  GET_BU_SUCCESS,
  GET_BU_FAILURE,
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAIL,
} from "../constants/adminConstants";

export interface BusinessUnit {
  _id: string;
  name: string;
}

interface AdminState {
  loading: boolean;
  error: string | null;
  message: string | null;
  businessUnits: BusinessUnit[];
  employees: any[];
  logs: any[];
}

const initialState: AdminState = {
  loading: false,
  error: null,
  message: null,
  businessUnits: [],
  employees: [],
  logs: [],
};

export const adminReducer = (state = initialState, action: any): AdminState => {
  switch (action.type) {
    // BU Actions
    case CREATE_BU_REQUEST:
    case GET_BU_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_BU_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: null,
      };

    case GET_BU_SUCCESS:
      return {
        ...state,
        loading: false,
        businessUnits: action.payload,
        error: null,
      };

    case CREATE_BU_FAILURE:
    case GET_BU_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Dashboard Actions
    case ADMIN_DASHBOARD_REQUEST:
      return { ...state, loading: true, error: null };

    case ADMIN_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload.employees,
        businessUnits: action.payload.businessUnits,
        logs: action.payload.logs,
      };

    case ADMIN_DASHBOARD_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
