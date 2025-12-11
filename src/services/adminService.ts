import axios from "../utils/axiosInstance";

export const deleteUserById = async (userId: string) => {
    console.log("userid", userId);
  const response = await axios.delete(`/api/business-units/deleteUser/${userId}`);
  console.log("res.data", response.data);
  return response.data;
};

// Payload structure:
// {
//   username?: string;
//   email?: string;
//   role?: string;
// }

export const updateUserById = async (
  userId: string,
  payload: {
    username?: string;
    email?: string;
    role?: string;
  }
) => {
  try {
    const response = await axios.put(
      `/api/business-units/updateUser/${userId}`,
      payload
    );

    return response.data; // success message + updated user
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export const getUserById = async (userId: string) => {
  const response = await axios.get(`/api/business-units/getUserById/${userId}`);
  return response.data;
};

export const getDepartmentStats = async (department: string = "all") => {
  try {
    const response = await axios.get(
      `/api/business-units/department-stats`,
      {
        params: { department },
      }
    );

    return response.data; // { success, type, data }
  } catch (error: any) {
    console.error("Error fetching department stats:", error);
    throw error?.response?.data || { message: "Something went wrong" };
  }
};
