import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Function to retrieve the access token from local storage
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Function to retrieve the refresh token from local storage
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// Function to set tokens in local storage
export const setTokens = (data) => {
  localStorage.setItem("token", data.access);
  localStorage.setItem("refreshToken", data.refresh_token);
  setTokenTimestamp(data.refresh_token);
};

// Function to fetch more data with pagination support
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.error("Error fetching more data:", err);
  }
};

// Function to handle following a profile
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? { ...profile, following_count: profile.following_count + 1 }
    : profile;
};

// Function to handle unfollowing a profile
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? { ...profile, following_count: profile.following_count - 1 }
    : profile;
};

// Function to set the token timestamp for expiration checks
export const setTokenTimestamp = (refreshToken) => {
  const refreshTokenTimestamp = jwtDecode(refreshToken).exp * 1000; // Convert to milliseconds
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Function to check if the refresh token should be refreshed
export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem("refreshTokenTimestamp");
  return timestamp ? Date.now() >= timestamp : false;
};

// Function to remove the token timestamp from local storage
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

// Function to refresh the access token using the refresh token
export const refreshAuthToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axiosReq.post('https://pixelstationproject5-api-1a9dadf46f0b.herokuapp.com/dj-rest-auth/token/refresh/', { refresh: refreshToken });
    setTokens(response.data);
    return response.data.access; // Return new access token
  } catch (err) {
    console.error('Error refreshing token:', err.response ? err.response.data : err.message);
    return null;
  }
};

// Function to check if the access token is expired
export const isTokenExpired = (token) => {
  const payload = jwtDecode(token);
  return payload.exp * 1000 < Date.now(); // Convert to milliseconds
};
