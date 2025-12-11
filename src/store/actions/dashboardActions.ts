import axios from "../../utils/axiosInstance";

export const getDashboardStats = () => async (dispatch: any) => {
  dispatch({ type: "DASHBOARD_STATS_REQUEST" });

  try {
    const res = await axios.get("/api/dashboard/stats");

    dispatch({
      type: "DASHBOARD_STATS_SUCCESS",
      payload: res.data.data,
    });
  } catch (err: any) {
    dispatch({
      type: "DASHBOARD_STATS_FAILURE",
      payload: err.response?.data?.message || "Failed to fetch stats",
    });
  }
};
