import { axiosReq } from "../api/axiosDefaults";

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

// Function to get the list of games
export const getGames = async () => {
  try {
      const { data } = await axiosReq.get('/games/');
      return data;
  } catch (error) {
      console.error("Error fetching games:", error);
      return [];
  }
};

// Function to get the list of game collections
export const getGameCollections = async () => {
  try {
      const { data } = await axiosReq.get('/collections/');
      return data;
  } catch (error) {
      console.error("Error fetching game collections:", error);
      return [];
  }
};