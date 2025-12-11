const initialState = {
  loading: false,
  error: null,
  stats: {
    totalEmployees: 0,
    totalBusinessUnits: 0,
    totalLogs: 0,
    availableEmployees: 0,
  }
};

export const dashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "DASHBOARD_STATS_REQUEST":
      return { ...state, loading: true };

    case "DASHBOARD_STATS_SUCCESS":
      return { ...state, loading: false, stats: action.payload };

    case "DASHBOARD_STATS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
