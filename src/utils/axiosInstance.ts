import axios from 'axios';
import store  from '../store/index';  // Import your Redux store

// Create Axios instance
const axiosInstance = axios.create({
  //  baseURL: "https://oppstream-server.onrender.com",
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Get the current state from the Redux store
    const token = state.auth.accessToken;  // Access token from the state

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      // Handle token expiration or invalid token here
      console.log('Token expired, refreshing...');
      // Call refresh token API or logout user
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
