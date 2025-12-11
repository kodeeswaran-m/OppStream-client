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
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../constants/adminConstants";

export interface BusinessUnit {
  _id: string;
  name: string;
}
// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// }
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  employee?: any;
}
interface AdminState {
  loading: boolean;
  error: string | null;
  message: string | null;
  businessUnits: BusinessUnit[];
  employees: any[];
  logs: any[];
  createdUser: User | null;

  // Users list
  users: User[];
  total: number;
  page: number;
  limit: number;
}

const initialState: AdminState = {
  loading: false,
  error: null,
  message: null,
  businessUnits: [],
  employees: [],
  logs: [],
  createdUser: null,
  users: [],
  total: 0,
  page: 1,
  limit: 10,
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
      return { ...state, loading: false, error: action.payload };

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
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case ADMIN_DASHBOARD_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        createdUser: action.payload.user,
        message: action.payload.message,
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit,
      };

    case GET_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
