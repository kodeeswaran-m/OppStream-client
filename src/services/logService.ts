import axios from "../utils/axiosInstance";

export const getLogById = async (logId: string) => {
  const response = await axios.get(`/api/employee/${logId}/getLogById`);
  return response.data;
};
export const updateLogById = async (logId: string, payload: any) => {
  const response = await axios.put(`/api/employee/updateLog/${logId}`, payload);
  return response.data;
};

export const getUserApprovalCounts = async () => {
  const response = await axios.get(`/api/employee/getUserApprovalCounts`);
  return response.data;
};
export const getEmployeeCounts = async () => {
  const response = await axios.get(`/api/employee/getEmployeeCounts`);
  return response.data;
};

export const getLogsByEmployeeId = async (id: string) => {
  const response = await axios.get(`/api/employee/getLogsByEmployeeId/${id}`);
  console.log("eee", response.data);
  return response.data;
};
