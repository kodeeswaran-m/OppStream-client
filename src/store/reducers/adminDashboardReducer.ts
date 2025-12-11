import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAIL,
} from "../constants/adminDashboardConstants";

const initialState = {
  loading: false,
  stats: {},
  employees: [],
  businessUnits: [],
  logs: [],
  error: null,
};

export const adminDashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADMIN_DASHBOARD_REQUEST:
      return { ...state, loading: true };

    case ADMIN_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload.stats,
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
