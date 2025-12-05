import axios from "../utils/axiosInstance";

export const getLogById = async (logId: string) => {
  const response = await axios.get(`/api/employee/${logId}/getLogById`);
  return response.data;
};
