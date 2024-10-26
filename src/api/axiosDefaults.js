import axios from "axios";

// Base URL for your API
axios.defaults.baseURL = "https://pixelstationproject5-api-1a9dadf46f0b.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;  // Important for sending cookies

// Create axios instances for requests and responses
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Function to get the token from localStorage
const getToken = () => localStorage.getItem("access_token");

// Attach the Authorization header to each request
const attachAuthHeader = (config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

axiosReq.interceptors.request.use(attachAuthHeader, (error) => Promise.reject(error));
axiosRes.interceptors.request.use(attachAuthHeader, (error) => Promise.reject(error));

// Interceptor for handling 401 errors
const handle401Error = async (error) => {
  if (error.response?.status === 401) {
    // Attempt to refresh token
    try {
      const refreshResponse = await axios.post('/auth/refresh/'); // Change to your refresh endpoint
      const { access_token } = refreshResponse.data;

      // Store the new access token
      localStorage.setItem("access_token", access_token);
      
      // Retry the original request with the new token
      error.config.headers["Authorization"] = `Bearer ${access_token}`;
      return axios(error.config);
    } catch (refreshError) {
      // If refresh fails, redirect to login
      window.location.href = "/login";
    }
  }
  return Promise.reject(error);
};

axiosReq.interceptors.response.use(
  (response) => response,
  handle401Error
);

axiosRes.interceptors.response.use(
  (response) => response,
  handle401Error
);
