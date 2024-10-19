import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const {data} = await axiosReq.get(resource.next);
    setResource(prevResource => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};
export const followHelper = (profile, clickedProfile, following_id) => {

  return profile.id === clickedProfile.id

    ? // This is the profile I clicked on,

      // update its followers count and set its following id

      {

        ...profile,

        followers_count: profile.followers_count + 1,

        following_id,

      }

    : profile.is_owner

    ? // This is the profile of the logged in user

      // update its following count

      { ...profile, following_count: profile.following_count + 1 }
      : // this is not the profile the user clicked on or the profile

      // the user owns, so just return it unchanged

      profile;

};



export const unfollowHelper = (profile, clickedProfile) => {

  return profile.id === clickedProfile.id

    ? // This is the profile I clicked on,

      // update its followers count and set its following id

      {

        ...profile,

        followers_count: profile.followers_count - 1,

        following_id: null,

      }

    : profile.is_owner

    ? // This is the profile of the logged in user

      // update its following count

      { ...profile, following_count: profile.following_count - 1 }

    : // this is not the profile the user clicked on or the profile

      // the user owns, so just return it unchanged

      profile;

};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

// Function to get the list of games from the API
export const getGames = async () => {
  try {
      const { data } = await axiosReq.get('/games/');
      return data; // Return the games data
  } catch (error) {
      console.error("Error fetching games:", error); // Log the error for debugging
      return []; // Return an empty array on error
  }
};

// Function to get the list of game collections from the API
export const getGameCollections = async () => {
  try {
      const { data } = await axiosReq.get('/collections/');
      return data; // Return the collections data
  } catch (error) {
      console.error("Error fetching game collections:", error); // Log the error for debugging
      return []; // Return an empty array on error
  }
};